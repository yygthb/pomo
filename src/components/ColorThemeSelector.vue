<script setup>
import { setColorTheme } from "@/helpers/colorTheme";
import { ref } from "vue";

const colors = ref([
  "green",
  "coral",
  "purple",
  "brown",
  "blue",
  "light",
  "dark",
]);

const selectedColorTheme = ref(colors.value[0]);

function updateColorTheme(color) {
  selectedColorTheme.value = color;
  setColorTheme(color);
}
</script>

<template>
  <ul class="colors-container">
    <div
      v-for="(color, idx) in colors"
      :key="idx"
      :class="[
        'color-item',
        `color-${color}`,
        color === selectedColorTheme && 'active',
      ]"
      @click="updateColorTheme(color)"
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

    &.active::after {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      content: "✓";
      font-size: 50px;
      color: var(--color-text);
    }

    &.color-green {
      background-color: var(--c-green);
    }

    &.color-coral {
      background-color: var(--c-coral);
    }

    &.color-purple {
      background-color: var(--c-purple);
    }

    &.color-brown {
      background-color: var(--c-brown);
    }

    &.color-blue {
      background-color: var(--c-blue);
    }

    &.color-light {
      background-color: var(--c-light);
    }

    &.color-dark {
      background-color: var(--c-dark);

      &.active::after {
        color: var(--color-text-contrast);
      }
    }
  }
}
</style>
