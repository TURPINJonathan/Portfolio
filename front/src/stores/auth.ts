import { defineStore } from 'pinia';

export const useAuthStore = defineStore('User', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }
});
