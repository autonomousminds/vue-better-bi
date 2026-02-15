<script setup lang="ts">
import { ref } from 'vue';
import { applyPreset, configureThemes, getThemes, themePresets, type ThemePresetName } from 'vue-better-echarts';

const presetNames = ['default', ...Object.keys(themePresets)] as const;
const activePreset = ref<string>('default');
const defaultThemes = JSON.parse(JSON.stringify(getThemes()));

function onPresetChange(event: Event) {
  const name = (event.target as HTMLSelectElement).value;
  activePreset.value = name;
  if (name === 'default') {
    configureThemes(defaultThemes.light);
  } else {
    applyPreset(name as ThemePresetName);
  }
}
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <h1 class="header-title">vue-better-echarts</h1>
      <span class="header-badge">Playground</span>
    </div>
    <div class="header-right">
      <label class="preset-label">
        <span class="preset-text">Theme</span>
        <select class="preset-select" :value="activePreset" @change="onPresetChange">
          <option v-for="name in presetNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </label>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--space-4);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}
.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.header-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.header-badge {
  font-size: var(--font-size-xs);
  padding: 2px 8px;
  background: var(--accent-bg);
  color: var(--accent-text);
  border-radius: 10px;
  font-weight: 500;
}
.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.preset-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.preset-text {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}
.preset-select {
  font-size: var(--font-size-sm);
  padding: 4px 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  outline: none;
  transition: all var(--transition-fast);
}
.preset-select:hover {
  background: var(--bg-hover);
}
.preset-select:focus {
  border-color: var(--accent);
}
</style>
