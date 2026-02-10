<script setup lang="ts">
import { computed, reactive } from 'vue';
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import ControlGroup from './ControlGroup.vue';

const { currentData, currentColumnConfigs, updateColumnConfig, resetColumnConfig } = usePlaygroundState();

const columns = computed(() => {
  const data = currentData.value as Record<string, unknown>[];
  if (!data || !data.length) return [];
  return Object.keys(data[0]);
});

// Track which columns are expanded
const expandedColumns = reactive<Record<string, boolean>>({});

function toggleExpand(colId: string) {
  const config = currentColumnConfigs.value[colId];
  if (!config?.enabled) return;
  expandedColumns[colId] = !expandedColumns[colId];
}

function toggleEnabled(colId: string, checked: boolean) {
  updateColumnConfig(colId, { enabled: checked });
  if (!checked) {
    expandedColumns[colId] = false;
  }
}

function onContentType(colId: string, value: string) {
  updateColumnConfig(colId, { contentType: value as '' | 'bar' | 'delta' | 'colorscale' });
}

function onText(colId: string, field: string, value: string) {
  updateColumnConfig(colId, { [field]: value });
}

function onSelect(colId: string, field: string, value: string) {
  updateColumnConfig(colId, { [field]: value });
}

function onCheck(colId: string, field: string, checked: boolean) {
  updateColumnConfig(colId, { [field]: checked });
}

function getConfig(colId: string) {
  return currentColumnConfigs.value[colId];
}
</script>

<template>
  <ControlGroup label="Column Configuration">
    <div v-if="columns.length === 0" class="no-columns">
      No data columns available
    </div>

    <div v-for="colId in columns" :key="colId" class="column-item">
      <!-- Column header row -->
      <div class="column-header">
        <input
          type="checkbox"
          :checked="!!getConfig(colId)?.enabled"
          @change="toggleEnabled(colId, ($event.target as HTMLInputElement).checked)"
          class="col-checkbox"
        />
        <span class="col-name" :class="{ disabled: !getConfig(colId)?.enabled }">{{ colId }}</span>
        <button
          v-if="getConfig(colId)?.enabled"
          class="col-expand-btn"
          :class="{ expanded: expandedColumns[colId] }"
          @click="toggleExpand(colId)"
          title="Configure column"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- Expanded settings -->
      <div v-if="expandedColumns[colId] && getConfig(colId)?.enabled" class="col-settings">
        <!-- Content Type -->
        <label class="setting-row">
          <span class="setting-label">Content Type</span>
          <select
            :value="getConfig(colId)?.contentType ?? ''"
            @change="onContentType(colId, ($event.target as HTMLSelectElement).value)"
            class="setting-select"
          >
            <option value="">Default</option>
            <option value="bar">Bar</option>
            <option value="delta">Delta</option>
            <option value="colorscale">Color Scale</option>
          </select>
        </label>

        <!-- Title -->
        <label class="setting-row">
          <span class="setting-label">Title</span>
          <input
            type="text"
            :value="getConfig(colId)?.title ?? ''"
            @input="onText(colId, 'title', ($event.target as HTMLInputElement).value)"
            placeholder="auto"
            class="setting-input"
          />
        </label>

        <!-- Format -->
        <label class="setting-row">
          <span class="setting-label">Format</span>
          <input
            type="text"
            :value="getConfig(colId)?.fmt ?? ''"
            @input="onText(colId, 'fmt', ($event.target as HTMLInputElement).value)"
            placeholder="auto"
            class="setting-input"
          />
        </label>

        <!-- Align -->
        <label class="setting-row">
          <span class="setting-label">Align</span>
          <select
            :value="getConfig(colId)?.align ?? ''"
            @change="onSelect(colId, 'align', ($event.target as HTMLSelectElement).value)"
            class="setting-select"
          >
            <option value="">Auto</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>

        <!-- Bar-specific settings -->
        <template v-if="getConfig(colId)?.contentType === 'bar'">
          <label class="setting-row">
            <span class="setting-label">Bar Color</span>
            <div class="color-wrapper">
              <input
                type="color"
                :value="getConfig(colId)?.barColor || '#a5cdee'"
                @input="onText(colId, 'barColor', ($event.target as HTMLInputElement).value)"
                class="setting-color"
              />
              <input
                type="text"
                :value="getConfig(colId)?.barColor ?? ''"
                @input="onText(colId, 'barColor', ($event.target as HTMLInputElement).value)"
                placeholder="#a5cdee"
                class="setting-input setting-color-text"
              />
            </div>
          </label>

          <label class="setting-row">
            <span class="setting-label">Neg Bar Color</span>
            <div class="color-wrapper">
              <input
                type="color"
                :value="getConfig(colId)?.negativeBarColor || '#fca5a5'"
                @input="onText(colId, 'negativeBarColor', ($event.target as HTMLInputElement).value)"
                class="setting-color"
              />
              <input
                type="text"
                :value="getConfig(colId)?.negativeBarColor ?? ''"
                @input="onText(colId, 'negativeBarColor', ($event.target as HTMLInputElement).value)"
                placeholder="#fca5a5"
                class="setting-input setting-color-text"
              />
            </div>
          </label>

          <label class="setting-row">
            <span class="setting-label">Background</span>
            <div class="color-wrapper">
              <input
                type="color"
                :value="getConfig(colId)?.backgroundColor || '#f0f0f0'"
                @input="onText(colId, 'backgroundColor', ($event.target as HTMLInputElement).value)"
                class="setting-color"
              />
              <input
                type="text"
                :value="getConfig(colId)?.backgroundColor ?? ''"
                @input="onText(colId, 'backgroundColor', ($event.target as HTMLInputElement).value)"
                placeholder="transparent"
                class="setting-input setting-color-text"
              />
            </div>
          </label>
        </template>

        <!-- Delta-specific settings -->
        <template v-if="getConfig(colId)?.contentType === 'delta'">
          <label class="setting-row setting-row-check">
            <input
              type="checkbox"
              :checked="!!getConfig(colId)?.downIsGood"
              @change="onCheck(colId, 'downIsGood', ($event.target as HTMLInputElement).checked)"
              class="col-checkbox"
            />
            <span class="setting-label">Down Is Good</span>
          </label>

          <label class="setting-row setting-row-check">
            <input
              type="checkbox"
              :checked="!!getConfig(colId)?.chip"
              @change="onCheck(colId, 'chip', ($event.target as HTMLInputElement).checked)"
              class="col-checkbox"
            />
            <span class="setting-label">Chip</span>
          </label>

          <label class="setting-row">
            <span class="setting-label">Symbol Position</span>
            <select
              :value="getConfig(colId)?.symbolPosition ?? 'right'"
              @change="onSelect(colId, 'symbolPosition', ($event.target as HTMLSelectElement).value)"
              class="setting-select"
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </label>

          <label class="setting-row">
            <span class="setting-label">Delta Text</span>
            <input
              type="text"
              :value="getConfig(colId)?.deltaText ?? ''"
              @input="onText(colId, 'deltaText', ($event.target as HTMLInputElement).value)"
              placeholder="e.g. vs. prev month"
              class="setting-input"
            />
          </label>
        </template>

        <!-- Colorscale-specific settings -->
        <template v-if="getConfig(colId)?.contentType === 'colorscale'">
          <label class="setting-row">
            <span class="setting-label">Color Scale</span>
            <input
              type="text"
              :value="getConfig(colId)?.colorScale ?? ''"
              @input="onText(colId, 'colorScale', ($event.target as HTMLInputElement).value)"
              placeholder="#edf8b1,#7fcdbb,#2c7fb8"
              class="setting-input"
            />
          </label>
        </template>

        <!-- Common settings -->
        <label class="setting-row">
          <span class="setting-label">Description</span>
          <input
            type="text"
            :value="getConfig(colId)?.description ?? ''"
            @input="onText(colId, 'description', ($event.target as HTMLInputElement).value)"
            placeholder="Column tooltip text"
            class="setting-input"
          />
        </label>

        <label class="setting-row">
          <span class="setting-label">Total Agg</span>
          <select
            :value="getConfig(colId)?.totalAgg ?? ''"
            @change="onSelect(colId, 'totalAgg', ($event.target as HTMLSelectElement).value)"
            class="setting-select"
          >
            <option value="">None</option>
            <option value="sum">Sum</option>
            <option value="mean">Mean</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
            <option value="median">Median</option>
            <option value="count">Count</option>
            <option value="countDistinct">Count Distinct</option>
          </select>
        </label>

        <label class="setting-row">
          <span class="setting-label">Column Group</span>
          <input
            type="text"
            :value="getConfig(colId)?.colGroup ?? ''"
            @input="onText(colId, 'colGroup', ($event.target as HTMLInputElement).value)"
            placeholder=""
            class="setting-input"
          />
        </label>

        <label class="setting-row setting-row-check">
          <input
            type="checkbox"
            :checked="!!getConfig(colId)?.redNegatives"
            @change="onCheck(colId, 'redNegatives', ($event.target as HTMLInputElement).checked)"
            class="col-checkbox"
          />
          <span class="setting-label">Red Negatives</span>
        </label>

        <!-- Reset -->
        <button class="reset-col-btn" @click="resetColumnConfig(colId); expandedColumns[colId] = false">
          Reset Column
        </button>
      </div>
    </div>
  </ControlGroup>
</template>

<style scoped>
.no-columns {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  padding: 4px 0;
}

.column-item {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 4px;
  margin-bottom: 4px;
}

.column-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
}

.col-checkbox {
  accent-color: var(--accent);
  width: 14px;
  height: 14px;
  cursor: pointer;
  flex-shrink: 0;
}

.col-name {
  font-size: var(--font-size-xs);
  color: var(--text-primary);
  flex: 1;
  font-family: var(--font-mono);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-name.disabled {
  color: var(--text-muted);
}

.col-expand-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  transition: transform var(--transition-fast), color var(--transition-fast);
  flex-shrink: 0;
}

.col-expand-btn:hover {
  color: var(--text-primary);
}

.col-expand-btn.expanded {
  transform: rotate(90deg);
}

.col-settings {
  padding-left: var(--space-4);
  border-left: 2px solid var(--border-color);
  margin-left: 7px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.setting-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-row-check {
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
}

.setting-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.setting-input,
.setting-select {
  width: 100%;
  padding: 3px 6px;
  font-size: var(--font-size-xs);
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  outline: none;
  box-sizing: border-box;
}

.setting-input:focus,
.setting-select:focus {
  border-color: var(--accent);
}

.setting-select {
  cursor: pointer;
}

.color-wrapper {
  display: flex;
  gap: 4px;
  align-items: center;
}

.setting-color {
  width: 24px;
  height: 24px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  padding: 0;
  background: none;
  flex-shrink: 0;
}

.setting-color-text {
  flex: 1;
  min-width: 0;
}

.reset-col-btn {
  margin-top: 2px;
  padding: 2px 8px;
  font-size: var(--font-size-xs);
  font-family: var(--font-sans);
  color: var(--text-muted);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  align-self: flex-start;
  transition: all var(--transition-fast);
}

.reset-col-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-color-strong);
  background: var(--bg-hover);
}
</style>
