<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="search-bar">
    <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      type="text"
      class="search-input"
      :value="modelValue"
      placeholder="Search..."
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 6px;
}

.search-icon {
  position: absolute;
  left: 8px;
  color: var(--table-muted-color, #999);
  pointer-events: none;
}

.search-input {
  width: 30%;
  min-width: 160px;
  padding: 4px 8px 4px 28px;
  font-size: 9pt;
  border: 1px solid var(--table-border-color, #e5e7eb);
  border-radius: 4px;
  outline: none;
  background: var(--table-bg-color, #fff);
  color: inherit;
}

.search-input:focus {
  border-color: var(--table-link-color, #3b82f6);
}

.search-input::placeholder {
  color: var(--table-muted-color, #999);
}

@media (max-width: 600px) {
  .search-input {
    width: 98%;
    font-size: 16px;
  }
}

@media print {
  .search-bar {
    display: none;
  }
}
</style>
