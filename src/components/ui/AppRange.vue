<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    default: 50,
  },
  step: {
    default: 10,
  },
  changeHandler: {
    type: Function,
  },
});

const rangeEmit = defineEmits(["update:modelValue"]);

function changeHandler(e) {
  rangeEmit("update:modelValue", e.target.value);
  props.changeHandler(+e.target.value);
}
</script>

<template>
  <div class="range-container">
    <input class="range" type="range" :value="modelValue" @input="changeHandler" step="10" />
  </div>
</template>

<style lang="scss" scoped>

.range-container {
  $trackHeight: 0.8rem;
  $trackColor: red;
  $thumbRadius: 1.2rem;
  $thumbColor: blue;

  @mixin slider-thumb {
    position: relative;
    width: $thumbRadius;
    height: $thumbRadius;
    background: var(--color-bg-dark-4);
    border-radius: 999px;
    border: none;
    pointer-events: all;
    appearance: none;
    z-index: 1;
  }

  width: fit-content;

  input.range {
    display: block;
    position: relative;
    width: 100%;
    appearance: none;
    border-radius: 999px;
    z-index: 0;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      width: var(--ProgressPercent, 100%);
      height: 100%;
      background: var(--color-bg);
      pointer-events: none;
      border-radius: 999px;
    }

    &::-webkit-slider-runnable-track {
      appearance: none;
      background: var(--color-bg);
      height: $trackHeight;
      border-radius: 999px;
    }

    &::-moz-range-track {
      appearance: none;
      background: var(--color-bg);
      height: $trackHeight;
      border-radius: 999px;
    }

    &::-moz-range-thumb {
      @include slider-thumb;
    }

    &::-webkit-slider-thumb {
      @include slider-thumb;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
