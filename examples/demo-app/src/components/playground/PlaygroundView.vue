<script setup lang="ts">
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import ViewTabs from './ViewTabs.vue';
import ChartView from './ChartView.vue';
import CodeView from './CodeView.vue';
import DataView from './DataView.vue';

const { activeTab, currentChart } = usePlaygroundState();
</script>

<template>
  <main class="playground">
    <div class="playground-header">
      <div class="chart-info">
        <h2 class="chart-name">{{ currentChart.name }}</h2>
        <p class="chart-desc">{{ currentChart.description }}</p>
      </div>
    </div>
    <ViewTabs />
    <div class="playground-content">
      <ChartView v-if="activeTab === 'chart'" />
      <CodeView v-else-if="activeTab === 'code'" />
      <DataView v-else-if="activeTab === 'data'" />
    </div>
  </main>
</template>

<style scoped>
.playground {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}
.playground-header {
  padding: var(--space-4) var(--space-4) var(--space-2);
}
.chart-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.chart-name {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
}
.chart-desc {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}
.playground-content {
  flex: 1;
  overflow: auto;
}
</style>
