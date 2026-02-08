<script setup lang="ts">
import { usePlaygroundState } from '../../composables/usePlaygroundState';

const { activeTab } = usePlaygroundState();

const tabs = [
  { key: 'chart' as const, label: 'Chart' },
  { key: 'code' as const, label: 'Code' },
  { key: 'data' as const, label: 'Data' },
];
</script>

<template>
  <div class="view-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-btn"
      :class="{ active: activeTab === tab.key }"
      @click="activeTab = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.view-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  padding: 0 var(--space-4);
}
.tab-btn {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: -1px;
}
.tab-btn:hover {
  color: var(--text-primary);
}
.tab-btn.active {
  color: var(--accent-text);
  border-bottom-color: var(--accent);
}
</style>
