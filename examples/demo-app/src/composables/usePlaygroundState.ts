import { ref, computed, reactive, watch, onMounted } from 'vue';
import type { ChartDefinition, PropDefinition } from '../types/playground.types';
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

function updateProp(name: string, value: unknown) {
  currentState.value[name] = value;
}

function resetToDefaults() {
  chartStates[selectedChartId.value] = initializeState(currentChart.value.props);
}

function selectChart(id: string) {
  selectedChartId.value = id;
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
});

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
    updateProp,
    resetToDefaults,
    selectChart,
  };
}
