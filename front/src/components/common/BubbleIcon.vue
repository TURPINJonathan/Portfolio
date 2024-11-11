<script setup lang="ts">
import { computed, defineEmits } from 'vue';

interface Props {
  size?: string;
  textColor?: string;
  backgroundColor?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: '25px',
  textColor: '#990606',
  backgroundColor: '#990606',
  icon: '',
});

const emit = defineEmits(['click']);

const handleClickOnIcon = (event: MouseEvent): void => {
  emit('click', event);
};

const getIconStyle = computed((): string => {
  let customStyle = '';

  const styleProps: Partial<Record<keyof Props, string | string[]>> = {
    size: ['width', 'height'],
    textColor: 'color',
    backgroundColor: 'background-color',
  };

  for (const prop in styleProps) {
    const cssProperties = styleProps[prop as keyof Props];
    const propValue = props[prop as keyof Props];
    if (propValue) {
      if (Array.isArray(cssProperties)) {
        cssProperties.forEach(cssProperty => {
          customStyle += `${cssProperty}: ${propValue};`;
        });
      } else {
        customStyle += `${cssProperties}: ${propValue};`;
      }
    }
  }

  return customStyle;
});

const fontAwesomeIcon = computed((): string => props.icon);
</script>

<template>
  <div
    class="icon-container"
    :style="getIconStyle"
    @click="handleClickOnIcon"
  >
    <FIcon
      class="icon"
      :icon="fontAwesomeIcon"
    />
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    border-radius: 50%;
    z-index: 2;
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, rgb(255 255 255 / 0%) 30%, rgb(255 255 255) 100%);
    transform: rotate(25deg);
  }

  .icon {
    z-index: 3;
    font-size: 0.7rem;
    transition: transform 0.3s ease-in-out;
  }

  .icon.fa-bars {
    transform: rotate(0deg);
  }

  .icon.fa-xmark {
    transform: rotate(90deg);
  }
}

</style>