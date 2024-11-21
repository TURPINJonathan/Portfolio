<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import FooterLayout from '#components/common/layout/FooterLayout.vue';
import HeaderLayout from '#components/common/layout/HeaderLayout.vue';
import { computed } from 'vue';

const route = useRoute();
console.log(route);
const routeName = computed(() => route.name?.toString() || '');
</script>

<template>
  <HeaderLayout />

  <main id="main">
    <div id="main-content">
      <RouterView />
    </div>
    <h1 id="main-title">{{ routeName }}</h1>
  </main>

  <FooterLayout />
</template>

<style scoped lang="scss">
#main {
  display: flex;
  flex-direction: row;
  position: relative;
  height: calc(100svh - 75px - 155px);

  #main-content {
    width: 90svw;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  #main-title {
    width: 10svw;
    display: flex;
    justify-content: center;
    font-size: 5rem;
    font-weight: bold;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-family: "Ephesis", cursive;
    font-weight: 400;
    font-style: normal;
    margin: 0;
  }
}
</style>