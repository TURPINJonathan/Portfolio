import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

interface UserState {
  token: string | null;
  tokenExpiration: string | null;
  email: string | null;
};

export const useAuthStore = defineStore('User', () => {
    // STATE
    const token: Ref<UserState['token']> = ref(localStorage.getItem('token') || null);
    const tokenExpiration: Ref<UserState['tokenExpiration']> = ref(localStorage.getItem('tokenExpiration') || null);
    const email: Ref<UserState['email']> = ref(null);
    
    // ACTIONS
    function setToken(newToken: string): void {
      token.value = newToken;
    };
    
    function setTokenExpiration(expirationTime: string): void {
      tokenExpiration.value = expirationTime;
    };

    function setEmail(userEmail: string): void {
      email.value = userEmail;
    };

    function clearToken(): void {
      token.value = null;
      tokenExpiration.value = null;
      email.value = null;

      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    };

    return {
      token,
      tokenExpiration,
      email,
      setToken,
      setTokenExpiration,
      setEmail,
      clearToken
    };
});
