<script setup lang="ts">
/**
 * ChartContainer component
 * Shared outer wrapper for all chart-like components (EChartsBase, BigValue, etc.)
 * Provides consistent padding, border-radius, margins, title/subtitle, and print styles.
 * Shows error display when error prop is set.
 * Shows empty state when data is provided but empty.
 */

import { computed } from 'vue';
import ChartHeader from './ChartHeader.vue';
import ErrorDisplay from './ErrorDisplay.vue';
import EmptyState from './EmptyState.vue';

const props = withDefaults(defineProps<{
  title?: string;
  titleIcon?: string;
  subtitle?: string;
  backgroundColor?: string;
  data?: Record<string, unknown>[];
  error?: string | null;
  emptySet?: 'pass' | 'warn' | 'error';
  emptyMessage?: string;
}>(), {});

const hasData = computed(() => {
  return props.data && props.data.length > 0;
});

const isEmptyData = computed(() => {
  return props.data !== undefined && !hasData.value;
});
</script>

<template>
  <div
    class="chart-container"
    :style="backgroundColor ? { backgroundColor } : undefined"
  >
    <ChartHeader :title="title" :title-icon="titleIcon" :subtitle="subtitle" />
    <template v-if="error">
      <ErrorDisplay :message="error" />
    </template>
    <template v-else-if="isEmptyData">
      <EmptyState :empty-set="emptySet" :empty-message="emptyMessage" />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style scoped>
.chart-container {
  padding: 0.75rem;
  border-radius: 6px;
}

@media print {
  .chart-container {
    padding: 0 !important;
  }
}
</style>
