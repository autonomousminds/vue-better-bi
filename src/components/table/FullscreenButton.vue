<script setup lang="ts">
defineProps<{
  visible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="fullscreen-btn"
      aria-label="Enter Fullscreen"
      @click="emit('open')"
    >
      <span>Fullscreen</span>
      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M2 5.5V2.5H5M13 5.5V2.5H10M2 9.5V12.5H5M13 9.5V12.5H10" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fullscreen-btn {
  display: flex;
  cursor: pointer;
  font-size: 1em;
  color: inherit;
  opacity: 0.5;
  align-items: baseline;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0 5px;
  gap: 3px;
  transition: all 200ms;
  user-select: none;
}

.fullscreen-btn:hover {
  opacity: 1;
  color: var(--table-link-color, #3b82f6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .fullscreen-btn {
    display: none;
  }
}

@media print {
  .fullscreen-btn {
    display: none;
  }
}
</style>
