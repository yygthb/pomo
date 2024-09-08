<script setup>
const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
});

const value = defineModel();
const emit = defineEmits(["onInput"]);

function onInput(e) {
  emit("onInput", +e.target.value);
}
</script>

<template>
  <input
    type="number"
    :value="value"
    :min="min"
    step="1"
    class="input"
    @input="onInput"
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
