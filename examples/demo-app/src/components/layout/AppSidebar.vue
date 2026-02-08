<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlaygroundState } from '../../composables/usePlaygroundState';

const { selectedChartId, chartRegistry, chartCategories, selectChart } = usePlaygroundState();
const search = ref('');

const filteredRegistry = computed(() => {
  const q = search.value.toLowerCase();
  if (!q) return chartRegistry;
  return chartRegistry.filter(c =>
    c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );
});

function chartsInCategory(category: string) {
  return filteredRegistry.value.filter(c => c.category === category);
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-search">
      <input
        v-model="search"
        type="text"
        placeholder="Search charts..."
        class="search-input"
      />
    </div>
    <nav class="sidebar-nav">
      <template v-for="category in chartCategories" :key="category">
        <div v-if="chartsInCategory(category).length > 0" class="nav-group">
          <div class="nav-group-label">{{ category }}</div>
          <button
            v-for="chart in chartsInCategory(category)"
            :key="chart.id"
            class="nav-item"
            :class="{ active: selectedChartId === chart.id }"
            @click="selectChart(chart.id)"
          >
            {{ chart.name }}
          </button>
        </div>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100%;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}
.sidebar-search {
  padding: var(--space-3);
  border-bottom: 1px solid var(--border-color);
}
.search-input {
  width: 100%;
  padding: 6px 10px;
  font-size: var(--font-size-sm);
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  outline: none;
  box-sizing: border-box;
}
.search-input:focus {
  border-color: var(--accent);
}
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2) 0;
}
.nav-group {
  margin-bottom: var(--space-2);
}
.nav-group-label {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.nav-item {
  display: block;
  width: 100%;
  padding: 6px var(--space-4);
  font-size: var(--font-size-sm);
  font-family: var(--font-sans);
  color: var(--text-secondary);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.nav-item:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}
.nav-item.active {
  color: var(--accent-text);
  background: var(--accent-bg);
  font-weight: 500;
}
</style>
