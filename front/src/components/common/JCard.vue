<script setup lang="ts">
import { ref } from 'vue';

const test = ref<string>('test');
</script>

<template>
  <div class="j-card">
    <div class="j-card-container">
      <template v-if="$slots['card-content']">
        <div class="j-card-content">
          <slot name="card-content"/>
        </div>
      </template>

      <template v-if="$slots['card-footer']">
        <div class="j-card-footer">
          <slot name="card-footer"/>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.j-card {
  border: 1px solid;
  border-radius: 20px;
  padding: 4px;

  .j-card-container {
    border-radius: 16px;
    padding: 10px;
  }
}
</style>