<script setup lang="ts">
import { computed, ref } from 'vue';
import { HEXADECIMAL_TEXT_COLORS } from '#constants/colors';

const props = withDefaults(defineProps<{
  textColor?: string,
  backgroundColor: string,
  icon: string,
  iconClass?: string,
}>(), {
  iconClass: 'in',
  textColor: HEXADECIMAL_TEXT_COLORS.BLACK,
});

const emit = defineEmits(['click-on-bubble-icon']);

const isBubbleIconHovered = ref<boolean>(false);

const getIconStyle = computed(() => {
  return {
    color: isBubbleIconHovered.value ? HEXADECIMAL_TEXT_COLORS.WHITE : HEXADECIMAL_TEXT_COLORS.BLACK,
    border: `1px solid ${props.backgroundColor}`,
    backgroundColor: isBubbleIconHovered.value ? props.backgroundColor : HEXADECIMAL_TEXT_COLORS.WHITE,
  };
});

const handleMouseEnter = () => {
  isBubbleIconHovered.value = true;
};

const handleMouseLeave = () => {
  isBubbleIconHovered.value = false;
};

const handleClickOnIcon = () => {
  emit('click-on-bubble-icon');
};
</script>

<template>
  <div class="icon-container">
    <div
      class="icon-sub-container"
      :style="getIconStyle"
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
    <div class="name-slot">
      <slot name="name" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  .icon-sub-container {
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

  .name-slot {
    text-align: end;
    transform: translate(0, 10px) rotate(-90deg);
    margin-top: 1rem;
  }
}
</style>