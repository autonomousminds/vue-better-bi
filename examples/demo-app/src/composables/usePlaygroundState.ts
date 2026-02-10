import { ref, computed, reactive, watch, onMounted } from 'vue';
import type { ChartDefinition, PropDefinition, ColumnConfig } from '../types/playground.types';
import { chartRegistry, chartCategories } from '../data/chartRegistry';
import { sampleDatasets } from '../data/sampleData';

function initializeState(props: PropDefinition[]): Record<string, unknown> {
  const state: Record<string, unknown> = {};
  for (const prop of props) {
    state[prop.name] = prop.defaultValue;
    if (prop.subProps) {
      for (const sub of prop.subProps) {
        state[`${prop.name}.${sub.name}`] = sub.defaultValue;
      }
    }
  }
  return state;
}

const selectedChartId = ref('bar-chart');
const activeTab = ref<'chart' | 'code' | 'data'>('chart');
const chartStates = reactive<Record<string, Record<string, unknown>>>({});
const columnConfigStates = reactive<Record<string, Record<string, ColumnConfig>>>({});
const settingsSearch = ref('');

const currentChart = computed<ChartDefinition>(() =>
  chartRegistry.find(c => c.id === selectedChartId.value) ?? chartRegistry[0]
);

const currentState = computed(() => {
  const id = selectedChartId.value;
  if (!chartStates[id]) {
    chartStates[id] = initializeState(currentChart.value.props);
  }
  return chartStates[id];
});

const currentData = computed(() =>
  sampleDatasets[currentChart.value.sampleDataKey] ?? []
);

const assembledProps = computed(() => {
  const state = currentState.value;
  const chart = currentChart.value;
  const result: Record<string, unknown> = {};

  // Add data bindings
  for (const [key, value] of Object.entries(chart.dataBindings)) {
    result[key] = value;
  }

  for (const propDef of chart.props) {
    if (propDef.subProps) {
      // Compound prop (zoom, toolbox, animation, tooltip)
      const enabled = state[propDef.name];
      if (enabled === false) {
        result[propDef.name] = false;
        continue;
      }
      if (!enabled) continue;
      // enabled === true: build config object
      const config: Record<string, unknown> = {};
      for (const sub of propDef.subProps) {
        const val = state[`${propDef.name}.${sub.name}`];
        if (val !== undefined && val !== '') {
          config[sub.name] = val;
        }
      }
      result[propDef.name] = Object.keys(config).length > 0 ? config : true;
    } else {
      const val = state[propDef.name];
      // Skip undefined and empty strings (no value set)
      if (val === undefined) continue;
      if (val === '' || val === null) continue;
      result[propDef.name] = val;
    }
  }

  return result;
});

// Group props by group name, filtering by search
const groupedProps = computed(() => {
  const groups: Record<string, PropDefinition[]> = {};
  const search = settingsSearch.value.toLowerCase();

  for (const prop of currentChart.value.props) {
    if (search && !prop.label.toLowerCase().includes(search) && !prop.name.toLowerCase().includes(search)) {
      continue;
    }
    if (!groups[prop.group]) {
      groups[prop.group] = [];
    }
    groups[prop.group].push(prop);
  }

  return groups;
});

// Ensure column config state exists for a chart (called outside of computeds to avoid side effects)
function ensureColumnConfigState(chartId: string) {
  if (!columnConfigStates[chartId]) {
    columnConfigStates[chartId] = {};
  }
}

const currentColumnConfigs = computed(() => {
  const id = selectedChartId.value;
  return columnConfigStates[id] || {};
});

const assembledColumnConfigs = computed<Record<string, Record<string, unknown>>>(() => {
  const configs = currentColumnConfigs.value;
  const data = currentData.value as Record<string, unknown>[];
  if (!data || !data.length) return {};

  const anyEnabled = Object.values(configs).some(c => c.enabled);
  if (!anyEnabled) return {};

  const allColumns = Object.keys(data[0]);
  const result: Record<string, Record<string, unknown>> = {};

  for (const colId of allColumns) {
    const config = configs[colId];
    if (config?.enabled) {
      const props: Record<string, unknown> = { id: colId };

      if (config.contentType) props.contentType = config.contentType;
      if (config.title) props.title = config.title;
      if (config.align) props.align = config.align;
      if (config.fmt) props.fmt = config.fmt;
      if (config.totalAgg) props.totalAgg = config.totalAgg;
      if (config.colGroup) props.colGroup = config.colGroup;
      if (config.redNegatives) props.redNegatives = true;
      if (config.description) props.description = config.description;

      if (config.contentType === 'bar') {
        if (config.barColor) props.barColor = config.barColor;
        if (config.negativeBarColor) props.negativeBarColor = config.negativeBarColor;
        if (config.backgroundColor) props.backgroundColor = config.backgroundColor;
      } else if (config.contentType === 'colorscale') {
        if (config.colorScale) {
          const colors = config.colorScale.split(',').map(s => s.trim()).filter(Boolean);
          if (colors.length > 0) props.colorScale = colors;
        }
      } else if (config.contentType === 'delta') {
        if (config.downIsGood) props.downIsGood = true;
        if (config.chip) props.chip = true;
        if (config.symbolPosition && config.symbolPosition !== 'right') {
          props.symbolPosition = config.symbolPosition;
        }
        if (config.deltaText) props.deltaText = config.deltaText;
      }

      result[colId] = props;
    } else {
      result[colId] = { id: colId };
    }
  }

  return result;
});

function updateColumnConfig(colId: string, patch: Partial<ColumnConfig>) {
  const id = selectedChartId.value;
  ensureColumnConfigState(id);
  const configs = columnConfigStates[id];
  if (!configs[colId]) {
    configs[colId] = { enabled: false };
  }
  Object.assign(configs[colId], patch);
}

function resetColumnConfig(colId: string) {
  const id = selectedChartId.value;
  if (columnConfigStates[id]) {
    delete columnConfigStates[id][colId];
  }
}

function updateProp(name: string, value: unknown) {
  currentState.value[name] = value;
}

function resetToDefaults() {
  chartStates[selectedChartId.value] = initializeState(currentChart.value.props);
  delete columnConfigStates[selectedChartId.value];
}

function selectChart(id: string) {
  selectedChartId.value = id;
  ensureColumnConfigState(id);
  activeTab.value = 'chart';
}

// URL hash sync
function syncFromHash() {
  const hash = window.location.hash.slice(1);
  if (hash && chartRegistry.some(c => c.id === hash)) {
    selectedChartId.value = hash;
  }
}

watch(selectedChartId, (id) => {
  window.location.hash = id;
  ensureColumnConfigState(id);
}, { immediate: true });

export function usePlaygroundState() {
  onMounted(syncFromHash);

  return {
    selectedChartId,
    activeTab,
    currentChart,
    currentState,
    currentData,
    assembledProps,
    groupedProps,
    settingsSearch,
    chartRegistry,
    chartCategories,
    currentColumnConfigs,
    assembledColumnConfigs,
    updateColumnConfig,
    resetColumnConfig,
    updateProp,
    resetToDefaults,
    selectChart,
  };
}
