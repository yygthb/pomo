<script setup>
import {
  computed,
  defineProps,
  defineEmits,
  ref,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select smth",
  },
  modelValue: {
    default: null,
  },
});

onMounted(() => {
  window.addEventListener("click", closeSelect);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeSelect);
});

const selectEmit = defineEmits(["update:modelValue"]);

const selectedValue = ref(null);
const isOpen = ref(false);
const select = ref(null);

const mappedSelectedValue = computed(() => {
  return selectedValue.value.name || selectedValue.value;
});

function onOptionClick(option) {
  selectedValue.value = option;
  selectEmit("update:modelValue", option);
  isOpen.value = false;
}

function closeSelect(el) {
  if (!select.value.contains(el.target)) {
    isOpen.value = false;
  }
}
</script>

<template>
  <div class="select-container" ref="select">
    <div class="select-value" @click="isOpen = !isOpen">
      <span v-if="selectedValue">{{ mappedSelectedValue }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
    </div>
    <transition name="fade">
      <ul v-if="isOpen" class="select-options">
        <li
          v-for="(option, idx) in options"
          :key="idx"
          class="select-option"
          @click="onOptionClick(option)"
          >
          {{ option.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.select-container {
  position: relative;
  width: 300px;
  cursor: pointer;
}

.select-value {
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;

  .placeholder {
    opacity: 0.5;
  }
}

.select-options {
  position: absolute;
  z-index: 1;
  left: 0;
  top: calc(100% + 2px);
  width: 100%;
  margin-top: 2px;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: #fff;
}

.select-option {
  padding: 10px;

  &:hover {
    background-color: lightgray;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
