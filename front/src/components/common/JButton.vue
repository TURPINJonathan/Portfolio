<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  inputType: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary' | 'dark' | 'light' | 'link';
  type?: 'button' | 'submit' | 'reset';
}>(), {
  
});
const getButtonClasses = computed((): string => {
  const classes = ['button'];

  if (props.inputType) {
    classes.push(`is-${props.inputType}`);
  }

  return classes.join(' ');
});
</script>

<template>
  <button :class="getButtonClasses" :type="props.type">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  border-radius: 25px;
  border: 1px solid;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
  &.is-success {
    border-color: var(--success);
    background-color: var(--success);
    color: var(--white);
  }
  &.is-danger {
    border-color: var(--danger);
    color: var(--danger);

    &:hover {
      border-color: transparent;
      background-color: var(--danger);
      color: var(--white);
    }
  }
  &.is-warning {
    border-color: var(--warning);
    background-color: var(--warning);
    color: var(--white);
  }
  &.is-info {
    border-color: var(--info);
    background-color: var(--info);
    color: var(--white);
  }
  &.is-primary {
    border-color: var(--primary);
    background-color: var(--primary);
    color: var(--white);
  }
  &.is-secondary {
    border-color: var(--secondary);
    background-color: var(--secondary);
    color: var(--white);
  }
  &.is-dark {
    border-color: var(--dark);
    background-color: var(--dark);
    color: var(--white);
  }
  &.is-light {
    border-color: var(--light);
    background-color: var(--light);
    color: var(--dark);
  }
  &.is-link {
    border-color: var(--primary);
    background-color: var(--white);
    color: var(--primary);
  }
}
</style>