<script setup>
import SettingsIcon from './icons/SettingsIcon.vue';

function openSettings() {
  console.log('open settings');
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-container">
        <div class="logo">PomodoroTracker</div>

        <div class="control-panel">
          <SettingsIcon class="settings-icon" @click="openSettings"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-text);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 600;
}

.settings-icon {
  cursor: pointer;
  transition: transform 0.3s;
}

.settings-icon:hover {
  transform: rotate(45deg);
}
</style>
