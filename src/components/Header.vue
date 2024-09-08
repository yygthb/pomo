<script setup>
import IconSettngs from "./icons/IconSettngs.vue";

function openSettings() {
  console.log("open settings");
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-container">
        <div class="logo">P🍅mo</div>

        <div class="control-panel">
          <IconSettngs class="icon-settings" @click="openSettings" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-text);

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-weight: 600;
  }

  .icon-settings {
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: rotate(45deg);
    }
  }
}
</style>
