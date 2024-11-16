<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterLayout from '#components/common/layout/FooterLayout.vue';
import HeaderLayout from '#components/common/layout/HeaderLayout.vue';

</script>

<template>
  <HeaderLayout />

  <main>
    <RouterView />
  </main>

  <FooterLayout />
</template>
