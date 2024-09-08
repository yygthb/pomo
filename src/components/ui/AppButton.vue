<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <button v-if="text" v-text="text"></button>
  <button v-else>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  display: block;
  height: 40px;
  min-width: 120px;
  padding: 0 25px;
  border: 1px solid var(--color-bg-dark-2);
  border-radius: var(--b-radius-m);
  font-size: 18px;
  color: var(--color-text-contrast);
  background-color: var(--color-bg-dark-2);
  text-align: center;

  &:hover {
    border-color: var(--color-bg-dark-3);
    background-color: var(--color-bg-dark-3);
  }

  &:active {
    border-color: var(--color-bg-dark-4);
    background-color: var(--color-bg-dark-4);
  }
}
</style>
