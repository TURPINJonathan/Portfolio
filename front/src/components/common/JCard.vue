<script setup lang="ts">
import { ref } from 'vue';

const test = ref<string>('test');
</script>

<template>
  <div class="j-card">
    <div class="j-card-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.j-card {
  border: 1px solid;
  border-radius: 20px;
  padding: 4px;

  .j-card-content {
    border-radius: 16px;
    padding: 10px;
  }
}
</style>