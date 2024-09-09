<script setup>
defineProps({
  colors: {
    type: Array,
    default: [],
  },
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <ul class="colors-container">
    <div
      v-for="(color, idx) in colors"
      :key="idx"
      :class="[
        'color-item',
        `color-${color}`,
        color === modelValue && 'active',
      ]"
      @click="emit('update:modelValue', color)"
    ></div>
  </ul>
</template>

<style lang="scss" scoped>
.colors-container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;

  .color-item {
    position: relative;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: var(--b-radius-l);
    cursor: pointer;

    &.active {
      &::after {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        content: "✓";
        font-size: 50px;
      }
    }

    &.color-green {
      background-color: var(--c-green);
    }

    &.color-coral {
      background-color: var(--c-coral);
    }
  }
}
</style>
