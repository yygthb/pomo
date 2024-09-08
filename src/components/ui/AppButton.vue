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
  padding: 10px 25px;
  border-radius: 5px;
  border: none;
}
</style>
