<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen", "closeModal"]);
function closeModal() {
  emit("update:isOpen", false);
  emit("closeModal");
}
</script>

<template>
  <div v-if="isOpen" class="overflow" @click.self="closeModal">
    <div class="modal">
      <div class="modal-close" @click="closeModal">✕</div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overflow {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 40px 0;
  background-color: rgba(#000, 0.5);
  overflow: hidden scroll;

  .modal {
    position: relative;
    width: 90%;
    max-width: 500px;
    margin: auto;
    padding: 60px;
    border-radius: var(--b-radius-xl);
    color: var(--color-text);
    background-color: var(--color-bg-white);

    &-close {
      position: absolute;
      z-index: 1;
      top: 8px;
      right: 12px;
      color: var(--color-text);
      font-size: 24px;
      cursor: pointer;

      &:hover {
        color: var(--color-acent);
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .overflow .modal {
    width: 95%;
    padding: 20px;
  }
}
</style>
