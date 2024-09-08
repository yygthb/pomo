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
  selectedOptionCb: {
    type: Function,
  }
});

onMounted(() => {
  window.addEventListener("click", closeSelect);
  if (props.modelValue) {
    selectedValue.value = props.modelValue;
  }
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
  props.selectedOptionCb(option);
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
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--b-radius-s);
  background-color: var(--color-bg-white);

  .placeholder {
    opacity: 0.5;
  }

  &:hover {
    border-color: var(--color-border-hover);
  }
}

.select-options {
  position: absolute;
  z-index: 1;
  left: 0;
  top: calc(100% + 2px);
  width: 100%;
  margin-top: 2px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background-color: var(--color-bg-white);
  box-shadow: 2px 2px 10px var(--color-bg);
}

.select-option {
  padding: 10px;

  &:hover {
    color: var(--color-text-contrast);
    background-color: var(--color-bg);
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
