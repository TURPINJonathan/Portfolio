import { useApi } from "#/composables/useApi";
import { useNotify } from "#/composables/useNotify";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./authStore";
import type { Module } from "#/types/module";

const { getCall } = useApi();

export const useModuleStore = defineStore('Module', () => {
  // STATE
  const modules = ref<Module[]>([]);

  // GETTERS
  const getModulesList = computed(() => modules.value);

  // ACTIONS
  async function fetchModulesList(): Promise<void> {
    try {
      modules.value = await getCall('/api/module/list');
      
      const authStore = useAuthStore();
      if (authStore.isLoggedIn) {
        modules.value.push({
          id: modules.value.reduce((max, module) => Math.max(max, module.id ?? 0), 0) + 1,
          name: 'Logout',
          icon: 'fas fa-sign-out-alt',
          isAdminModule: true
        })
      }
    } catch (err) {
      useNotify('error', 'Failed to get modules');
    }
  }

  return {
    modules,
    fetchModulesList,
    getModulesList
  };
});