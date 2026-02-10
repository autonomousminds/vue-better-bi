<script setup lang="ts">
import { exportToCsv } from '../../utils/tableUtils';

const props = defineProps<{
  data: Record<string, unknown>[];
  columns: string[];
  visible?: boolean;
}>();

function handleDownload() {
  exportToCsv(props.data, props.columns, 'table-data');
}
</script>

<template>
  <div class="table-footer" :class="{ visible }">
    <button
      class="download-btn"
      title="Download CSV"
      @click="handleDownload"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.table-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  height: 20px;
  margin-top: 4px;
  opacity: 0;
  transition: opacity 200ms;
}

.table-footer.visible {
  opacity: 1;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--table-muted-color, #999);
  border-radius: 4px;
  transition: color 200ms, background-color 200ms;
}

.download-btn:hover {
  color: var(--table-link-color, #3b82f6);
  background-color: var(--table-row-shading, #f3f4f6);
}

@media print {
  .table-footer {
    display: none;
  }
}
</style>
