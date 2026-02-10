<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  currentPage: number;
  pageCount: number;
  totalRows: number;
  displayedCount: number;
}>();

const emit = defineEmits<{
  (e: 'goToPage', page: number): void;
}>();

const inputPage = ref<number | null>(null);

watch(() => props.currentPage, () => {
  inputPage.value = null;
});

function handlePageInput() {
  if (inputPage.value !== null && inputPage.value >= 1 && inputPage.value <= props.pageCount) {
    emit('goToPage', inputPage.value);
  }
}
</script>

<template>
  <div class="pagination">
    <div class="page-controls">
      <!-- First page -->
      <button
        aria-label="first-page"
        class="page-btn"
        :disabled="currentPage === 1"
        @click="emit('goToPage', 1)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </button>

      <!-- Previous page -->
      <button
        aria-label="previous-page"
        class="page-btn"
        :disabled="currentPage === 1"
        @click="emit('goToPage', currentPage - 1)"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Page indicator -->
      <span class="page-count">
        Page
        <input
          type="number"
          class="page-input"
          :class="{ error: inputPage !== null && inputPage > pageCount }"
          :style="{ width: `${(inputPage ?? currentPage).toString().length + 1.5}ch` }"
          :value="inputPage"
          :placeholder="String(currentPage)"
          @input="inputPage = ($event.target as HTMLInputElement).valueAsNumber || null"
          @keyup.enter="handlePageInput"
          @change="handlePageInput"
        />
        /
        <span class="ml-1">{{ pageCount.toLocaleString() }}</span>
      </span>

      <span class="record-count">
        {{ displayedCount.toLocaleString() }} of {{ totalRows.toLocaleString() }} records
      </span>

      <!-- Next page -->
      <button
        aria-label="next-page"
        class="page-btn"
        :disabled="currentPage === pageCount"
        @click="emit('goToPage', currentPage + 1)"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <!-- Last page -->
      <button
        aria-label="last-page"
        class="page-btn"
        :disabled="currentPage === pageCount"
        @click="emit('goToPage', pageCount)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  color: var(--table-muted-color, #999);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2em;
  user-select: none;
  margin-top: 0.5em;
  font-variant-numeric: tabular-nums;
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 3px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 1.1em;
  width: 1.1em;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  transition: color 200ms;
}

.page-btn:disabled {
  opacity: 0.25;
  cursor: default;
}

.page-btn:not(:disabled):hover {
  color: var(--table-link-color, #3b82f6);
}

.page-count {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.ml-1 {
  margin-left: 4px;
}

.page-input {
  box-sizing: content-box;
  text-align: center;
  padding: 0.25em 0.5em;
  margin: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  background: var(--table-row-shading, #f3f4f6);
  color: inherit;
  -moz-appearance: textfield;
  appearance: textfield;
}

.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.page-input:hover {
  border-color: var(--table-border-color, #e5e7eb);
}

.page-input.error {
  border-color: var(--table-negative-color, #dc2626);
}

.page-input::placeholder {
  color: var(--table-muted-color, #999);
}

.record-count {
  display: none;
}

@media (max-width: 600px) {
  .page-btn {
    height: 1.2em;
    width: 1.2em;
  }

  .page-count {
    font-size: 1.1em;
  }

  .page-input {
    font-size: 1.1em;
  }
}

@media print {
  .pagination {
    break-inside: avoid;
  }

  .page-btn {
    display: none;
  }

  .page-count {
    display: none;
  }

  .record-count {
    display: inline;
  }
}
</style>
