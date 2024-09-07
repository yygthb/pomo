<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    default: 50,
  },
  step: {
    default: 1,
  },
  changeHandler: {
    type: Function,
  }
})

const rangeEmit = defineEmits(['update:modelValue'])

function changeHandler(e) {
  rangeEmit('update:modelValue', e.target.value)
  props.changeHandler();
}
</script>

<template>
  <input type="range" :value="modelValue" @input="changeHandler" step="10" />
</template>

<style lang="scss" scoped>
</style>
