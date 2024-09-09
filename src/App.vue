<script setup>
import Header from "./components/Header.vue";
import TimerContainer from "./components/TimerContainer.vue";
import Footer from "./components/Footer.vue";
import AppModal from "./components/ui/AppModal.vue";
import Settings from "./components/Settings.vue";
import { store } from "./store/store";
const { modal } = store;

function closeModalCb() {
  modal.closeSettings();
}
</script>

<template>
  <div class="app">
    <Header />

    <main class="main">
      <div class="container">
        <TimerContainer class="timer-container" />
      </div>
    </main>

    <Footer />

    <AppModal :isOpen="modal.isSettingsOpen" @closeModal="closeModalCb">
      <Settings />
    </AppModal>
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
