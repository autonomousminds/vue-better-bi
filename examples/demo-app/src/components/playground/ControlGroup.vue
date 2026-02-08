<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  defaultOpen?: boolean;
}>();

const isOpen = ref(props.defaultOpen ?? false);
</script>

<template>
  <div class="control-group" :class="{ open: isOpen }">
    <button class="group-header" @click="isOpen = !isOpen">
      <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
      <span class="group-label">{{ label }}</span>
    </button>
    <div v-if="isOpen" class="group-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.control-group {
  border-bottom: 1px solid var(--border-color);
}
.group-header {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}
.group-header:hover {
  background: var(--bg-hover);
}
.chevron {
  color: var(--text-muted);
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}
.open .chevron {
  transform: rotate(90deg);
}
.group-content {
  padding: 0 var(--space-3) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
