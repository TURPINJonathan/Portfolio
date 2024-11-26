<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue';
import { HEXADECIMAL_TEXT_COLORS } from '#constants/colors';

const props = withDefaults(defineProps<{
  textColor?: string,
  backgroundColor?: string,
  bordered?: boolean,
  icon: string,
  isItemActive?: boolean,
  navigator?: boolean,
  iconClass?: string,
}>(), {
  iconClass: 'in',
  bordered: false,
  navigator: false,
  isItemActive: false,
  textColor: HEXADECIMAL_TEXT_COLORS.BLACK,
});

const emit = defineEmits(['click-on-bubble-icon']);

const isBubbleIconHovered = ref<boolean>(false);

const getIconNavStyle = computed((): CSSProperties => {
  return {
    color: props.isItemActive ? HEXADECIMAL_TEXT_COLORS.WHITE : HEXADECIMAL_TEXT_COLORS.BLACK,
  };
});

const getIconStyle = computed((): CSSProperties => {
  return {
    color: isBubbleIconHovered.value ? HEXADECIMAL_TEXT_COLORS.WHITE : HEXADECIMAL_TEXT_COLORS.BLACK,
    border: props.bordered ? `1px solid ${props.backgroundColor}` : 'none',
    backgroundColor: isBubbleIconHovered.value ? props.backgroundColor : HEXADECIMAL_TEXT_COLORS.WHITE,
  };
});

const getIconClasses = computed((): string => {
    const classes = ['icon-container'];

    if (props.navigator) classes.push('navigator-icon');
    if (props.isItemActive) classes.push('active');

    return classes.join(' ');
});

const handleMouseEnter = (): void => {
  isBubbleIconHovered.value = true;
};

const handleMouseLeave = (): void => {
  isBubbleIconHovered.value = false;
};

const handleClickOnIcon = (): void => {
  emit('click-on-bubble-icon');
};
</script>

<template>
  <div
    :class="getIconClasses"
    :style="navigator ? getIconNavStyle : getIconStyle"
    @click="handleClickOnIcon"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span
      class="icon"
      :class="props.iconClass"
    >
      <FIcon :icon="props.icon" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.navigator-icon {
  transition: all 0.3s ease-in-out;
}

.navigator-icon.active {
  transform: scale(1.6) rotate(360deg);
}
.icon-container {
  padding: 0.5rem;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.5s ease-in-out;
  }

  .icon.in {
    transform: rotate(0deg);
  }

  .icon.out {
    transform: rotate(360deg);
  }
}
</style>