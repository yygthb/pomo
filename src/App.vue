<script setup>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app">
    <Header />

    <Main class="main" />

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main {
    flex: 1;
    padding: 20px 0 40px;
  }
}
</style>
