<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BubbleIcon from '#components/common/BubbleIcon.vue';
import { ROUTES_NAMES } from '#constants/routes';

const router = useRouter();

const navMenuIcons = computed(() => [
  { backgroundColor: '#ff0000', icon: 'fas fa-home', textColor: '#ffffff', routeName: ROUTES_NAMES.HOME },
  { backgroundColor: '#00ff00', icon: 'fas fa-user', textColor: '#000000', routeName: ROUTES_NAMES.ADMIN },
  { backgroundColor: '#0000ff', icon: 'fas fa-cog', textColor: '#ffffff', routeName: ROUTES_NAMES.CONTACT },
  { backgroundColor: '#ffff00', icon: 'fas fa-sign-out-alt', textColor: '#000000', routeName: ROUTES_NAMES.ADMIN_CHILD },
]);

const handleClickOnNavIcon = (routeName: string): void => {
  if (routeName) {
    router.push({ name: routeName });
  }
};

const isItemActive = (routeName: string): boolean => {
  return router.currentRoute.value.name === routeName;
};
</script>

<template>
  <header id="header">
    <nav id="header-nav">
      <template
        v-for="(bubble, index) in navMenuIcons"
        :key="index"
      >
        <BubbleIcon
          :backgroundColor="bubble.backgroundColor"
          :icon="bubble.icon"
          :textColor="bubble.textColor"
          :is-item-active="isItemActive(bubble.routeName)"
          navigator
          @click-on-bubble-icon="handleClickOnNavIcon(bubble.routeName)"
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