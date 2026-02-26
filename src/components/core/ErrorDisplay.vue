<script setup lang="ts">
/**
 * ErrorDisplay component
 * Shows a styled error message with a red-tinted background.
 * Used by ChartContainer to display errors instead of chart content.
 */

defineProps<{
  message: string;
  title?: string;
}>();
</script>

<template>
  <div class="error-display">
    <div class="error-header">
      <span class="error-icon">&#9888;</span>
      <span v-if="title" class="error-title">{{ title }}</span>
    </div>
    <p class="error-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.error-display {
  background-color: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 6px;
  padding: 12px 16px;
  margin-top: 4px;
}

.error-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.error-icon {
  color: #dc2626;
  font-size: 1em;
  line-height: 1;
}

.error-title {
  font-weight: 600;
  color: #dc2626;
  font-size: 0.9em;
}

.error-message {
  color: #b91c1c;
  font-size: 0.85em;
  line-height: 1.5;
  margin: 0;
}
</style>
