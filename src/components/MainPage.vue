<script setup>
import TimerContainer from "./TimerContainer.vue";
import Settings from "./Settings.vue";
</script>

<template>
  <main class="main-page">
    <div class="container">
      <TimerContainer class="timer-container" />

      <Settings />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main-page {
  padding: 20px 0;
}
</style>
