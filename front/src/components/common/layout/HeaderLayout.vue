<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import BubbleIcon from '#components/common/BubbleIcon.vue';
import { ROUTES_NAMES } from '#constants/routes';
import { useModuleStore } from '#store/moduleStore';
import type { Module } from '#types/module';
import { useApi } from '#composables/useApi';
import { useNotify } from '#composables/useNotify';
import { useAuthStore } from '#store/authStore';

const router = useRouter();
const moduleStore = useModuleStore();
const authStore = useAuthStore();
const { logout } = useApi();

const handleClickOnNavIcon = async(routeName: string): Promise<void> => {
  if (routeName) {
    if (routeName === ROUTES_NAMES.LOGOUT) {
      await authStore.clearToken();
      await useNotify('success', 'Vous avez été déconnecté');
      await logout();
    } else {
      router.push({ name: routeName });
    }
  }
};

const isItemActive = (routeName: string): boolean => {
  return router.currentRoute.value.name === routeName;
};

const modulesList = computed((): Module[] => moduleStore.getModulesList);

const fetchModules = async (): Promise<void> => {
  await moduleStore.fetchModulesList();
};

onMounted(async() => {
  fetchModules();

  window.addEventListener('user-logged-in', moduleStore.fetchModulesList);
  window.addEventListener('user-logged-out', moduleStore.fetchModulesList);;
});

onUnmounted(() => {
  window.removeEventListener('user-logged-in', moduleStore.fetchModulesList);
  window.removeEventListener('user-logged-out', moduleStore.fetchModulesList);
});
</script>

<template>
  <header id="header">
    <nav id="header-nav">
      <template
        v-for="(module) in modulesList"
        :key="module.id"
      >
        <BubbleIcon
          :icon="module.icon"
          :is-item-active="isItemActive(module.name)"
          navigator
          @click-on-bubble-icon="handleClickOnNavIcon(module.name)"
        />
      </template>
    </nav>
  </header>
</template>

<style scoped lang="scss">
#header {
  max-height: var(--header-max-height);
  padding-top: 10px;

  #header-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 8px;
    width: max-content;
    margin: auto;
    border-radius: 50px;
    gap: 1rem;
    position: relative;

    background: rgba( 255, 255, 255, 0.4 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
  }
}
</style>