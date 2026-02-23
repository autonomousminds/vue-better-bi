<script setup lang="ts">
/**
 * ChartContainer component
 * Shared outer wrapper for all chart-like components (EChartsBase, BigValue, etc.)
 * Provides consistent padding, border-radius, margins, title/subtitle, and print styles.
 * Shows empty state when data is empty.
 */

import { computed } from 'vue';
import ChartHeader from './ChartHeader.vue';

const props = withDefaults(defineProps<{
  title?: string;
  titleIcon?: string;
  subtitle?: string;
  backgroundColor?: string;
  data?: Record<string, unknown>[];
}>(), {});

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});
</script>

<template>
  <div
    class="chart-container"
    :style="backgroundColor ? { backgroundColor } : undefined"
  >
    <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />
    <template v-if="data === undefined || hasData">
      <slot />
    </template>
    <div v-else class="empty-state empty-info">
      No data found
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  padding: 0.75rem;
  border-radius: 6px;
}

.empty-state {
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-top: 4px;
}

.empty-info {
  background-color: rgba(107, 114, 128, 0.06);
  border: 1px solid rgba(107, 114, 128, 0.15);
  color: #6b7280;
}

@media print {
  .chart-container {
    padding: 0 !important;
  }
}
</style>
