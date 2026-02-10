<script setup lang="ts">
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import ControlGroup from './ControlGroup.vue';
import PropControl from './PropControl.vue';
import ColumnConfigPanel from './ColumnConfigPanel.vue';

const { groupedProps, currentState, currentChart, settingsSearch, updateProp, resetToDefaults } = usePlaygroundState();

function isVisible(prop: { showWhen?: (s: Record<string, unknown>) => boolean }) {
  if (!prop.showWhen) return true;
  return prop.showWhen(currentState.value);
}

// First group is chart-specific (expanded by default)
function isDefaultOpen(groupName: string): boolean {
  const chart = currentChart.value;
  if (!chart) return false;
  // The first group in the chart's props is chart-specific
  const firstGroup = chart.props[0]?.group;
  return groupName === firstGroup || groupName === 'Titles';
}
</script>

<template>
  <aside class="settings-panel">
    <div class="settings-header">
      <span class="settings-title">Settings</span>
      <button class="reset-btn" @click="resetToDefaults" title="Reset to defaults">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
        Reset
      </button>
    </div>
    <div class="settings-search">
      <input
        v-model="settingsSearch"
        type="text"
        placeholder="Filter settings..."
        class="search-input"
      />
    </div>
    <div class="settings-body">
      <template v-for="(props, groupName) in groupedProps" :key="groupName">
        <ControlGroup :label="String(groupName)" :defaultOpen="isDefaultOpen(String(groupName))">
          <template v-for="prop in props" :key="prop.name">
            <template v-if="isVisible(prop)">
              <PropControl
                :definition="prop"
                :modelValue="currentState[prop.name]"
                @update:modelValue="updateProp(prop.name, $event)"
              />
              <!-- Sub-props for compound controls -->
              <template v-if="prop.subProps && currentState[prop.name]">
                <div class="sub-props">
                  <PropControl
                    v-for="sub in prop.subProps"
                    :key="sub.name"
                    :definition="sub"
                    :modelValue="currentState[`${prop.name}.${sub.name}`]"
                    @update:modelValue="updateProp(`${prop.name}.${sub.name}`, $event)"
                  />
                </div>
              </template>
            </template>
          </template>
        </ControlGroup>
      </template>

      <!-- Column configuration for DataTable -->
      <ColumnConfigPanel v-if="currentChart.componentName === 'DataTable'" />
    </div>
  </aside>
</template>

<style scoped>
.settings-panel {
  width: var(--settings-width);
  height: 100%;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  border-bottom: 1px solid var(--border-color);
}
.settings-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
}
.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: var(--font-size-xs);
  font-family: var(--font-sans);
  color: var(--text-muted);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.reset-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-color-strong);
  background: var(--bg-hover);
}
.settings-search {
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--border-color);
}
.search-input {
  width: 100%;
  padding: 4px 8px;
  font-size: var(--font-size-xs);
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
.settings-body {
  flex: 1;
  overflow-y: auto;
}
.sub-props {
  padding-left: var(--space-4);
  border-left: 2px solid var(--border-color);
  margin-left: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
