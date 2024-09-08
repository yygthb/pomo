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
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 24px;
  outline: none;
  width: 100%;
}
</style>
