import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { ref } from 'vue';

import { useAuthStore } from '#store/authStore';
import { ROUTES, ROUTES_NAMES } from '#/constants/routes';
import { useRouter } from 'vue-router';

// @ts-ignore
const currentEnv = import.meta.env as ImportMetaEnv;
const apiClient: AxiosInstance = axios.create({
  baseURL:
    currentEnv.MODE === 'development'
      ? currentEnv.VITE_API_URL_DEV
      : currentEnv.VITE_API_URL_PROD,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response.status === axios.HttpStatusCode.Unauthorized) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      window.location.href = ROUTES.HOME;
    }
    return Promise.reject(error);
  }
);

export function useApi() {
  const loading = ref(false);
  const error = ref<unknown>(null);
  const router = useRouter();

  const getCall = async (url: string, config?: AxiosRequestConfig) => {
    loading.value = true;
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const postCall = async (
    url: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    loading.value = true;
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const putCall = async (
    url: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => {
    loading.value = true;
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const delCall = async (url: string, config?: AxiosRequestConfig) => {
    loading.value = true;
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    const authStore = useAuthStore();
    loading.value = true;

    try {
      const response = await apiClient.post('auth/login', credentials);

      const token = response.data.token;
      const tokenExpiration = new Date().getTime() + 1800 * 1000;
      
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', tokenExpiration.toString());

      authStore.setToken(token);
      authStore.setTokenExpiration(tokenExpiration.toString());
      authStore.setEmail(credentials.email);
      
      window.dispatchEvent(new CustomEvent('user-logged-in'));

      return response;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    const authStore = useAuthStore();

    authStore.clearToken();

    window.dispatchEvent(new CustomEvent('user-logged-out'));
    
    router.push({ name: ROUTES_NAMES.HOME });
  }

  return {
    getCall,
    postCall,
    putCall,
    delCall,
    login,
    logout,
    loading,
    error
  };
}
