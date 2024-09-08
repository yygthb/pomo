<script setup>
import Header from "./components/Header.vue";
import MainPage from "./components/MainPage.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app">
    <Header />

    <MainPage class="main" />

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
