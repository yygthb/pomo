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
  border: 1px solid red;
}
</style>
