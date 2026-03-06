<script setup lang="ts">
defineProps<{
  visible?: boolean;
}>();

const emit = defineEmits<{
  (e: 'export-csv'): void;
  (e: 'export-excel'): void;
}>();
</script>

<template>
  <div class="table-footer" :class="{ visible }">
    <button
      class="download-btn"
      title="Download CSV"
      @click="emit('export-csv')"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" />
        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" />
        <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="2" />
        <line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" stroke-width="2" />
      </svg>
      <span class="btn-label">CSV</span>
    </button>

    <button
      class="download-btn"
      title="Download Excel"
      @click="emit('export-excel')"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" />
        <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" stroke-width="2" />
        <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" stroke-width="2" />
        <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" stroke-width="2" />
      </svg>
      <span class="btn-label">Excel</span>
    </button>
  </div>
</template>

<style scoped>
.table-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
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
  gap: 3px;
  padding: 2px 4px;
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

.btn-label {
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
}

@media print {
  .table-footer {
    display: none;
  }
}
</style>
