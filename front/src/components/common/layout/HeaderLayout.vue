<script setup lang="ts">
import { computed, ref } from 'vue';
// import { RouterLink } from 'vue-router';
import BubbleIcon from '../BubbleIcon.vue';

const isMenuOpen = ref<boolean>(false);
const areMenuIconsVisible = ref<boolean>(false);

const navMainIcon = computed((): string => isMenuOpen.value ? 'fas fa-xmark' : 'fas fa-bars');
const navMenuIcons = computed((): string[] => ['fas fa-home', 'fas fa-user', 'fas fa-cog', 'fas fa-sign-out-alt']);

const handleClickOnMainNavIcon = (): void => {  
  if (isMenuOpen.value) {
    areMenuIconsVisible.value = true;
  }
  isMenuOpen.value = !isMenuOpen.value;
};

const subMenuIconsClasses = computed((): string => isMenuOpen.value ? 'fade-in' : 'fade-out');

const getIconPositionStyle = (index: number, totalIcons: number): Record<string, string> => {
  const angle = (index / (totalIcons - 1)) * Math.PI;
  const radius = 25;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return {
    position: 'absolute',
    left: `${50 + x}%`,
    top: `${50 + y}%`,
    transform: 'translate(-50%, -50%)',
    opacity: '0',
    animationDelay: `${index * 0.1}s`,
  };
};

const handleAnimationEnd = (event: AnimationEvent): void => {
  if (event.animationName === 'fade-in') {
    areMenuIconsVisible.value = true;
  } else if (event.animationName === 'fade-out') {
    setTimeout(() => {
      areMenuIconsVisible.value = false;
    }, 1000);
  }
};
</script>

<template>
  <header id="header">
    <nav id="header-nav">
      <BubbleIcon
        :backgroundColor="'#b0b0b0'"
        :icon="navMainIcon"
        :size="'25px'"
        :textColor="'#333333'"
        @click="handleClickOnMainNavIcon"
      />
      
      <div
        class="surrounding-icons"
        :style="isMenuOpen ? 'display: block;' : 'display: none'"
        @animationend="handleAnimationEnd"
      >
        <template
          v-for="(icon, index) in navMenuIcons"
          :key="index"
        >
          <BubbleIcon
            :backgroundColor="'#b0b0b0'"
            class="surrounding-icon"
            :class="subMenuIconsClasses"
            :icon="icon"
            :size="'25px'"
            :style="getIconPositionStyle(index, navMenuIcons.length)"
            :textColor="'#333333'"
            @click="handleClickOnMainNavIcon"
          />
        </template>
      </div>
      <!-- <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink> -->
    </nav>
  </header>
</template>

<style scoped lang="scss">
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }

}

#header {
  background-color: transparent;
  padding-top: 0.5rem;

  #header-nav {
    display: flex;
    justify-content: center;
    max-width: 10dvw;
    max-height: 25px;
    margin: 0 auto;
    gap: 1rem;

    .icon-container {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .surrounding-icons {
      position: absolute;
      width: 250px;
      height: 120px;
      top: -13;
      left: 50;
      transition: opacity 0.5s ease,
      transform 0.5s ease;
    }

    .surrounding-icon {
      position: absolute;
      transition: opacity 0.5s ease,
      transform 0.5s ease;

      &.fade-in {
        animation: fade-in 0.5s forwards;
      }

      &.fade-out {
        animation: fade-out 0.5s forwards;
      }
    }
  }
}
</style>