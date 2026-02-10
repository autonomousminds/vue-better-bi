<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  text: string;
}>();

const visible = ref(false);
</script>

<template>
  <span
    class="info-icon-wrapper"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <span class="info-icon">&#9432;</span>
    <span v-if="visible" class="info-tooltip">{{ text }}</span>
  </span>
</template>

<style scoped>
.info-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 2px;
}

.info-icon {
  font-size: 0.7em;
  cursor: help;
  opacity: 0.6;
}

.info-icon:hover {
  opacity: 1;
}

.info-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--table-tooltip-bg, #1a1a1a);
  color: var(--table-tooltip-color, #fff);
  font-size: 0.75rem;
  font-weight: 400;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: normal;
  min-width: 120px;
  max-width: 250px;
  line-height: 1.4;
  z-index: 50;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: normal;
}

.info-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--table-tooltip-bg, #1a1a1a);
}
</style>
