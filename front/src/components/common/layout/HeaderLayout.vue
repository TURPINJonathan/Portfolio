<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import BubbleIcon from '#components/common/BubbleIcon.vue';
import { HEXADECIMAL_TEXT_COLORS } from '#constants/colors';
import { ROUTES } from '#constants/routes';

const router = useRouter();

const isMenuOpen = ref<boolean>(false);
const navMenuIcons = computed(() => [
  { backgroundColor: '#ff0000', icon: 'fas fa-home', textColor: '#ffffff', routeName: ROUTES.HOME },
  { backgroundColor: '#00ff00', icon: 'fas fa-user', textColor: '#000000', routeName: ROUTES.HOME },
  { backgroundColor: '#0000ff', icon: 'fas fa-cog', textColor: '#ffffff', routeName: ROUTES.HOME },
  { backgroundColor: '#ffff00', icon: 'fas fa-sign-out-alt', textColor: '#000000', routeName: ROUTES.HOME },
]);

const navMainIcon = computed((): string => isMenuOpen.value ? 'fas fa-xmark' : 'fas fa-bars');

const handleClickOnMainNavIcon = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOnNavIcon = (routeName: string): void => {
  if (routeName) {
    router.push({ name: routeName });
  }
};

</script>

<template>
  <header id="header">
    <nav id="header-nav">
      <BubbleIcon
        :backgroundColor="'#b0b0b0'"
        :icon="navMainIcon"
        :iconClass="isMenuOpen ? 'out' : 'in'"
        :size="'25px'"
        :textColor="HEXADECIMAL_TEXT_COLORS.BLACK"
        @click-on-bubble-icon="handleClickOnMainNavIcon"
      />

      <div
        class="surrounding-icons"
        :style="{ display: isMenuOpen ? 'flex' : 'none' }"
      >
        <template
          v-for="(bubble, index) in navMenuIcons"
          :key="index"
        >
          <BubbleIcon
            :backgroundColor="bubble.backgroundColor"
            :icon="bubble.icon"
            :textColor="bubble.textColor"
            @click-on-bubble-icon="handleClickOnNavIcon(bubble.routeName)"
          />
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
#header {
  padding-top: 1rem;

  #header-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: relative;

    .surrounding-icons {
      position:absolute;
      top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>