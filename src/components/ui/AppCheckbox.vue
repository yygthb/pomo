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
  background-color: var(--color-bg);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.switch:hover .slider {
  background-color: var(--color-bg-dark);
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

.checkbox-wrapper input:checked + .slider:before {
  transform: translateX(20px);
}

.checkbox-wrapper .slider.round {
  border-radius: 20px;
}

.checkbox-wrapper .slider.round:before {
  border-radius: 50%;
}
</style>
