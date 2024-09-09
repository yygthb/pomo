<script setup>
import { store } from "@/store/store";
import IconSettngs from "./icons/IconSettngs.vue";

const { modal } = store;

function openModal() {
  modal.openSettings();
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-container">
        <div class="logo">P🍅mo</div>

        <div class="control-panel">
          <IconSettngs class="icon-settings" @click="openModal" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  $icon-scale: 1.5;

  padding: 20px 0;
  background-color: var(--color-bg-dark);
  color: var(--color-text-contrast);

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-weight: 600;
  }

  .icon-settings {
    stroke: var(--color-text-contrast);
    cursor: pointer;
    transform: scale($icon-scale);
    transition: transform 0.3s;

    &:hover {
      transform: scale($icon-scale) rotate(45deg);
    }
  }
}
</style>
