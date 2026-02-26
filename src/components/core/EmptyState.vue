<script setup lang="ts">
/**
 * EmptyState component
 * Configurable empty state with three visual modes: pass, warn, error.
 * Used by ChartContainer when data is present but empty.
 */

import { computed } from 'vue';

const props = withDefaults(defineProps<{
  emptySet?: 'pass' | 'warn' | 'error';
  emptyMessage?: string;
  height?: string;
}>(), {
  emptySet: 'pass',
  emptyMessage: 'No data available'
});

const modeClass = computed(() => `empty-${props.emptySet}`);
</script>

<template>
  <div
    class="empty-state"
    :class="modeClass"
    :style="height ? { height } : undefined"
  >
    <span class="empty-text">{{ emptyMessage }}</span>
  </div>
</template>

<style scoped>
.empty-state {
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.9em;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-text {
  line-height: 1.5;
}

/* Pass mode: neutral gray */
.empty-pass {
  background-color: rgba(107, 114, 128, 0.06);
  border: 1px solid rgba(107, 114, 128, 0.15);
  color: #6b7280;
}

/* Warn mode: yellow/amber */
.empty-warn {
  background-color: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: #92400e;
}

/* Error mode: red */
.empty-error {
  background-color: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #b91c1c;
}
</style>
