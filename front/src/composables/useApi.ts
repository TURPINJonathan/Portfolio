import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '#store/auth';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD,
  headers: {
    'Content-Type': 'application/json',
  },
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
      const router = useRouter();
      router.push('/login');
    }
    return Promise.reject(error);
  },
);

export function useApi() {
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref<unknown>(null);

  const getCall = async(url: string, config?: AxiosRequestConfig) => {
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

  const postCall = async(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig) => {
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

  const putCall = async(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig) => {
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

  const delCall = async(url: string, config?: AxiosRequestConfig) => {
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
  
  const login = async(credentials: { email: string, password: string }) => {
    loading.value = true;
    try {
      const response = await apiClient.post('auth/login', credentials);
      const token = response.data.token;
      const tokenExpiration = new Date().getTime() + 1800 * 1000; // 1800 secondes = 30 minutes
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', tokenExpiration.toString());
      authStore.setToken(token);
      return response.data;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  return {
    getCall,
    postCall,
    putCall,
    delCall,
    login,
    loading,
    error,
  };
}