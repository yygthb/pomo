<script setup>
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app">
    <Header />

    <Main class="app-main" />

    <Footer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
}

.main {
  padding: 20px 0 40px;
}

</style>
