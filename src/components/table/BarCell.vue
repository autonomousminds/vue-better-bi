<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

const props = withDefaults(defineProps<{
  value: number;
  min: number;
  max: number;
  label?: string;
  barColor?: string;
  negativeBarColor?: string;
  backgroundColor?: string;
  hideLabels?: boolean;
  align?: string;
}>(), {
  barColor: '#a5cdee',
  negativeBarColor: '#fca5a5',
  backgroundColor: 'transparent',
});

const totalWidth = computed(() => {
  if (props.min >= 0) return props.max;
  if (props.max < 0) return Math.abs(props.min);
  return Math.abs(props.min) + props.max;
});

const hasNegative = computed(() => props.min < 0);

const axisPosition = computed(() => {
  if (!hasNegative.value) return 0;
  return (Math.abs(props.min) / (Math.abs(props.min) + props.max)) * 100;
});

const barWidth = computed(() => {
  if (totalWidth.value === 0) return 0;
  return Math.min(Math.abs(props.value / totalWidth.value) * 100, 100);
});

const isNegative = computed(() => props.value < 0);

const barLeft = computed(() => {
  if (isNegative.value) return undefined;
  if (hasNegative.value) return `${axisPosition.value}%`;
  return '0';
});

const barRight = computed(() => {
  if (!isNegative.value) return undefined;
  return `${(1 - Math.abs(props.min) / (Math.abs(props.min) + props.max)) * 100}%`;
});

const labelAreaWidth = computed(() => {
  const positiveMax = Math.abs(props.max);
  const absMin = hasNegative.value ? Math.abs(props.min) : 0;
  return (positiveMax / (absMin + positiveMax)) * 100;
});

const labelLeft = computed(() => {
  if (hasNegative.value && props.max >= 0) return `${axisPosition.value}%`;
  return '0';
});
</script>

<template>
  <div class="bar-container" :style="{ backgroundColor }">
    <!-- Negative bar -->
    <div
      v-if="hasNegative && isNegative"
      class="bar-fill"
      :style="{
        width: `${barWidth}%`,
        backgroundColor: negativeBarColor,
        right: barRight,
      }"
    />

    <!-- Positive bar -->
    <div
      v-if="!isNegative"
      class="bar-fill"
      :style="{
        width: `${barWidth}%`,
        backgroundColor: barColor,
        left: barLeft,
      }"
    />

    <!-- Label overlay -->
    <div
      v-if="!hideLabels"
      class="bar-label"
      :style="{
        textAlign: (align || 'left') as CSSProperties['textAlign'],
        width: `${labelAreaWidth}%`,
        left: labelLeft,
      } as CSSProperties"
    >
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.bar-container {
  width: 100%;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  min-height: 1.4em;
}

.bar-fill {
  height: 100%;
  position: absolute;
}

.bar-label {
  position: relative;
  z-index: 2;
  padding-left: 4px;
  padding-right: 4px;
}
</style>
