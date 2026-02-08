<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStores, applyPreset, configureThemes, getThemes, themePresets, type ThemePresetName } from 'vue-better-echarts';

const { activeAppearance, cycleAppearance } = useThemeStores();

const presetNames = ['default', ...Object.keys(themePresets)] as const;
const activePreset = ref<string>('default');
const defaultThemes = JSON.parse(JSON.stringify(getThemes()));

function onPresetChange(event: Event) {
  const name = (event.target as HTMLSelectElement).value;
  activePreset.value = name;
  if (name === 'default') {
    configureThemes(defaultThemes);
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
      <button class="theme-btn" @click="cycleAppearance" :title="`Theme: ${activeAppearance}`">
        <svg v-if="activeAppearance === 'light'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
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
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.theme-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
</style>
