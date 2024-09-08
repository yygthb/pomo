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

const emit = defineEmits(["update:isOpen"]);
function closeModal() {
  emit("update:isOpen", false);
}
</script>

<template>
  <div v-if="isOpen" class="overflow" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-content">modal content</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overflow {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(#000, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    padding: 40px;
    border-radius: var(--b-radius-xl);
    background-color: var(--color-bg-white);
  }
}
</style>
