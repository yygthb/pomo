<script setup>
import { getCurrentInstance } from "vue";

const { uid } = getCurrentInstance();
const checked = defineModel();
const emit = defineEmits(["onChange"]);

function onInput(e) {
  emit("onChange", e.target.checked);
}
</script>

<template>
  <div class="checkbox-wrapper">
    <label class="switch" :for="uid">
      <input type="checkbox" v-model="checked" :id="uid" @input="onInput" />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox-wrapper .switch {
  display: inline-block;
  height: 20px;
  position: relative;
  width: 40px;
}

.checkbox-wrapper .switch input {
  display: none;
}

.checkbox-wrapper .slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  background-color: var(--color-border);
  cursor: pointer;
}

.switch:hover .slider {
  background-color: var(--color-border-hover);
}

.checkbox-wrapper .slider:before {
  position: absolute;
  content: "";
  left: 2px;
  bottom: 2px;
  height: 16px;
  width: 16px;
  background-color: var(--color-text-contrast);
  transition: 0.4s;
}

.checkbox-wrapper input:checked + .slider {
  background-color: var(--color-bg);
}

.checkbox-wrapper input:checked + .slider:before {
  transform: translateX(20px);
}

.checkbox-wrapper .slider.round {
  border-radius: 20px;
}

.checkbox-wrapper .slider.round:before {
  border-radius: 50%;
}

body.light {
  .checkbox-wrapper .slider {
    background-color: var(--color-bg-dark);
  }

  .checkbox-wrapper input:checked + .slider {
    background-color: var(--color-bg-dark-3);
  }
}
</style>
