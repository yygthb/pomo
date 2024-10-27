<script setup>
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 60,
  },
});

const value = defineModel();
const emit = defineEmits(["onInput"]);

function onInput(e) {
  if (+e.target.value < props.min) {
    e.target.value = props.min;
    emit("onInput", props.min);
    return;
  }

  if (+e.target.value > props.max) {
    e.target.value = props.max;
    emit("onInput", props.max);
    return;
  }

  emit("onInput", +e.target.value);
}

function isNumber(event) {
  if (!/\d/.test(event.key) && event.key !== ".") return event.preventDefault();
}
</script>

<template>
  <input
    type="number"
    :value="value"
    :min="min"
    :max="max"
    step="1"
    class="input"
    @input="onInput"
    @keypress="isNumber"
  />
</template>

<style lang="scss" scoped>
.input {
  display: block;
  height: 50px;
  padding: 0 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--b-radius-m);
  font-size: 24px;
  outline: none;
  width: 100%;

  &:hover {
    border-color: var(--color-border-hover);
  }
}
</style>
