<script setup lang="ts">
import { computed } from 'vue';
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import CopyButton from '../common/CopyButton.vue';

const { currentData } = usePlaygroundState();

const columns = computed(() => {
  const data = currentData.value;
  if (!data.length) return [];
  return Object.keys(data[0]);
});

const csvText = computed(() => {
  const data = currentData.value;
  if (!data.length) return '';
  const cols = columns.value;
  const header = cols.join(',');
  const rows = data.map(row =>
    cols.map(col => {
      const val = row[col];
      if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
      return String(val ?? '');
    }).join(',')
  );
  return [header, ...rows].join('\n');
});
</script>

<template>
  <div class="data-view">
    <div class="data-toolbar">
      <span class="data-label">{{ currentData.length }} rows</span>
      <CopyButton :text="csvText" />
    </div>
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in currentData.slice(0, 100)" :key="i">
            <td v-for="col in columns" :key="col">{{ row[col] }}</td>
          </tr>
          <tr v-if="currentData.length > 100">
            <td :colspan="columns.length" class="truncated">
              ... {{ currentData.length - 100 }} more rows
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.data-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.data-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}
.data-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 500;
}
.data-table-wrapper {
  flex: 1;
  overflow: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  font-family: var(--font-mono);
}
.data-table th {
  position: sticky;
  top: 0;
  padding: 6px 12px;
  text-align: left;
  font-weight: 600;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-bottom: 2px solid var(--border-color);
  white-space: nowrap;
}
.data-table td {
  padding: 4px 12px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  white-space: nowrap;
}
.data-table tbody tr:hover td {
  background: var(--bg-hover);
}
.truncated {
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  font-family: var(--font-sans);
}
</style>
