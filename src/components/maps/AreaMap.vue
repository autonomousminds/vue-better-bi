<script setup lang="ts">
/**
 * AreaMap component
 * Choropleth map with custom GeoJSON
 */

import { computed, ref, watch, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import type { AreaMapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatTitle, getFormatObjectFromString } from '../../utils/formatting';
import { checkInputs } from '../../utils/checkInputs';

const props = withDefaults(defineProps<AreaMapProps>(), {
  geoId: 'id',
  height: '500px',
  width: '100%',
  legend: true,
  filter: false,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorScale } = useThemeStores();

// ── Module-level GeoJSON cache ──────────────────────────────────────────────
// Shared across all AreaMap instances to avoid re-fetching the same URL.
const geoJsonCache = new Map<string, unknown>();

async function fetchGeoJson(url: string): Promise<unknown> {
  if (geoJsonCache.has(url)) return geoJsonCache.get(url);
  const response = await fetch(url);
  const data = await response.json();
  geoJsonCache.set(url, data);
  return data;
}

// ── Resolve color scale ─────────────────────────────────────────────────────
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'blue').value
);

// ── Format objects ──────────────────────────────────────────────────────────
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// ── Input validation ────────────────────────────────────────────────────────
const validation = computed(() => {
  return checkInputs(props.data, [props.areaCol, props.value]);
});

// ── GeoJSON loading ─────────────────────────────────────────────────────────
const geoJsonLoaded = ref(false);
const loadError = ref<string | undefined>(undefined);
const mapName = ref(`custom_map_${Date.now()}`);

const loadGeoJson = async () => {
  if (!props.geoJsonUrl) return;

  try {
    const geoJson = await fetchGeoJson(props.geoJsonUrl);
    echarts.registerMap(mapName.value, geoJson as Parameters<typeof echarts.registerMap>[1]);
    geoJsonLoaded.value = true;
    loadError.value = undefined;
  } catch (error) {
    console.error('Failed to load GeoJSON:', error);
    geoJsonLoaded.value = false;
    loadError.value = `Failed to load GeoJSON: ${error instanceof Error ? error.message : String(error)}`;
  }
};

onMounted(() => {
  loadGeoJson();
});

watch(() => props.geoJsonUrl, () => {
  geoJsonLoaded.value = false;
  loadError.value = undefined;
  mapName.value = `custom_map_${Date.now()}`;
  loadGeoJson();
});

// ── Process map data ────────────────────────────────────────────────────────
const mapData = computed(() => {
  if (!validation.value.valid || !props.data?.length || !props.areaCol || !props.value) {
    return { data: [], min: 0, max: 0 };
  }

  let min = Infinity;
  let max = -Infinity;

  const data = props.data.map((row) => {
    const value = row[props.value] as number;
    if (value != null) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    return {
      name: String(row[props.areaCol]),
      value: value
    };
  });

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  return { data, min, max };
});

// ── Format column name for tooltip display ──────────────────────────────────
const valueColumnTitle = computed(() => formatTitle(props.value));

// ── Build chart config ──────────────────────────────────────────────────────
const chartConfig = computed<EChartsOption>(() => {
  const { data, min, max } = mapData.value;

  return {
    title: {
      text: props.title,
      subtext: props.subtitle
    },
    tooltip: {
      trigger: 'item' as const,
      showDelay: 0,
      transitionDuration: 0.2,
      confine: true,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number };
        const displayValue =
          p.value != null && !Number.isNaN(p.value)
            ? formatValue(p.value, valueFormat.value)
            : '-';
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `<span>${valueColumnTitle.value}: </span>`;
        output += `<span style='float:right; margin-left: 10px;'>${displayValue}</span>`;
        return output;
      }
    },
    visualMap: {
      type: 'continuous' as const,
      show: props.legend,
      min,
      max,
      left: 'left',
      top: 'bottom',
      calculable: props.filter,
      inRange: {
        color: colorScaleResolved.value || ['#e0f3db', '#0868ac']
      },
      ...(props.filter
        ? {}
        : {
            text: [
              formatValue(max, valueFormat.value),
              formatValue(min, valueFormat.value)
            ]
          }),
      formatter: ((val: unknown) => {
        return formatValue(Number(val), valueFormat.value);
      }) as unknown as string
    },
    series: [
      {
        name: valueColumnTitle.value,
        type: 'map',
        map: mapName.value,
        roam: true,
        nameProperty: props.geoId,
        emphasis: {
          label: {
            show: true
          }
        },
        itemStyle: {
          borderColor: props.borderColor ?? '#ffffff',
          borderWidth: props.borderWidth ?? 1,
          areaColor: undefined,
          opacity: props.opacity ?? 0.8
        },
        data: geoJsonLoaded.value ? data : []
      }
    ]
  };
});

const hovering = ref(false);
</script>

<template>
  <!-- Validation error state -->
  <div v-if="!validation.valid" class="map-error">
    <div class="map-error-content">
      <span class="map-error-icon">!</span>
      <span>{{ validation.error }}</span>
    </div>
  </div>
  <!-- Map load error -->
  <div v-else-if="loadError" class="map-error">
    <div class="map-error-content">
      <span class="map-error-icon">!</span>
      <span>{{ loadError }}</span>
    </div>
  </div>
  <!-- Loading state -->
  <div v-else-if="!geoJsonLoaded" class="map-loading">
    Loading map data...
  </div>
  <!-- Chart -->
  <EChartsBase
    v-else
    :config="chartConfig"
    :height="props.height"
    :width="props.width"
    :renderer="props.renderer"
    :echarts-options="props.echartsOptions"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="props.data"
        :chart-title="props.title"
        :echarts-options="props.echartsOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>

<style scoped>
.map-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('props.height');
  color: #666;
}

.map-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('props.height');
  color: #dc3545;
  padding: 1rem;
}

.map-error-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}

.map-error-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}
</style>
