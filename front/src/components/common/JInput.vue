<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  inputType: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  modelValue: string;
  required?: boolean;
}>(), {
  inputType: 'text',
  required: false,
});

const emit = defineEmits(['update:modelValue']);

const onUpdateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const getInputClasses = computed(() => {
  const classes = ['j-input'];

  if (props.required && !props.modelValue) {
    classes.push('required');
  }

  return classes.join(' ');
});
</script>

<template>
  <div class="input-container">
    <input
      :class="getInputClasses"
      :type="props.inputType"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onUpdateValue"
    />
    
    <template v-if="$slots['append']">
      <div class="input-append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;

  .j-input {
    border-radius: 25px;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: auto;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    &.required {
      animation: shake 0.5s;
      border: 3px solid var(--danger);
    }
  }

  .input-append {
    position: absolute;
    top: 20%;
    right: 10px;
    width: 25px;
    height: calc(100% - 15px);
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>