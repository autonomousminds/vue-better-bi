<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue';
import * as echarts from 'echarts';
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import {
  BarChart, LineChart, AreaChart, ScatterPlot, BubbleChart,
  BoxPlot, Histogram, FunnelChart, PieChart, Heatmap,
  CalendarHeatmap, SankeyDiagram, WaterfallChart,
  USMap, PointMap, BubbleMap,
  DataTable, Column
} from 'vue-better-echarts';

const componentMap: Record<string, Component> = {
  BarChart, LineChart, AreaChart, ScatterPlot, BubbleChart,
  BoxPlot, Histogram, FunnelChart, PieChart, Heatmap,
  CalendarHeatmap, SankeyDiagram, WaterfallChart,
  USMap, PointMap, BubbleMap,
  DataTable,
};

// World GeoJSON needs to be registered for PointMap/BubbleMap
const WORLD_GEOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const worldMapLoaded = ref(false);
const worldMapLoading = ref(false);

async function ensureWorldMap() {
  if (worldMapLoaded.value || worldMapLoading.value) return;
  worldMapLoading.value = true;
  try {
    const res = await fetch(WORLD_GEOJSON_URL);
    const topoJson = await res.json();
    // Convert TopoJSON to GeoJSON (countries-110m is TopoJSON)
    const countries = topoJson.objects.countries;
    const geoJson = {
      type: 'FeatureCollection',
      features: countries.geometries.map((geom: Record<string, unknown>) => ({
        type: 'Feature',
        properties: geom.properties || { name: geom.id },
        geometry: topoGeoToGeoJSON(geom, topoJson.arcs, topoJson.transform),
        id: geom.id,
      })),
    };
    echarts.registerMap('world', geoJson as never);
    worldMapLoaded.value = true;
  } catch (e) {
    console.warn('Failed to load world map:', e);
  } finally {
    worldMapLoading.value = false;
  }
}

// Minimal TopoJSON arc decoder
function decodeArc(arc: number[][], transform?: { scale: number[]; translate: number[] }): number[][] {
  const coords: number[][] = [];
  let x = 0, y = 0;
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    if (transform) {
      coords.push([
        x * transform.scale[0] + transform.translate[0],
        y * transform.scale[1] + transform.translate[1],
      ]);
    } else {
      coords.push([x, y]);
    }
  }
  return coords;
}

function resolveArcs(indices: number[], arcs: number[][][], transform?: { scale: number[]; translate: number[] }): number[][] {
  const coords: number[][] = [];
  for (const idx of indices) {
    const arc = idx < 0 ? [...decodeArc(arcs[~idx], transform)].reverse() : decodeArc(arcs[idx], transform);
    coords.push(...arc);
  }
  return coords;
}

function topoGeoToGeoJSON(
  geom: Record<string, unknown>,
  arcs: number[][][],
  transform?: { scale: number[]; translate: number[] }
): Record<string, unknown> {
  const type = geom.type as string;
  const arcIndices = geom.arcs as number[][] | number[][][];

  if (type === 'Polygon') {
    return {
      type: 'Polygon',
      coordinates: (arcIndices as number[][]).map(ring => resolveArcs(ring, arcs, transform)),
    };
  }
  if (type === 'MultiPolygon') {
    return {
      type: 'MultiPolygon',
      coordinates: (arcIndices as number[][][]).map(polygon =>
        polygon.map(ring => resolveArcs(ring, arcs, transform))
      ),
    };
  }
  return { type, coordinates: [] };
}

const { currentChart, assembledProps, assembledColumnConfigs, currentData } = usePlaygroundState();

const isTable = computed(() => currentChart.value.componentName === 'DataTable');

const activeColumnEntries = computed(() => {
  const configs = assembledColumnConfigs.value;
  return Object.entries(configs);
});

const needsWorldMap = computed(() =>
  currentChart.value.componentName === 'PointMap' || currentChart.value.componentName === 'BubbleMap'
);

const chartComponent = computed(() =>
  componentMap[currentChart.value.componentName]
);

const ready = computed(() => {
  if (needsWorldMap.value) return worldMapLoaded.value;
  return true;
});

watch(needsWorldMap, (needs) => {
  if (needs) ensureWorldMap();
}, { immediate: true });
</script>

<template>
  <div class="chart-view">
    <div v-if="needsWorldMap && !ready" class="chart-loading">
      Loading world map...
    </div>

    <!-- DataTable has its own rendering (no ECharts) -->
    <DataTable
      v-else-if="isTable && activeColumnEntries.length > 0"
      :data="(currentData as Record<string, unknown>[])"
      v-bind="assembledProps"
    >
      <Column
        v-for="[colId, colProps] in activeColumnEntries"
        :key="colId"
        v-bind="colProps"
      />
    </DataTable>
    <DataTable
      v-else-if="isTable"
      :data="(currentData as Record<string, unknown>[])"
      v-bind="assembledProps"
    />

    <component
      v-else-if="chartComponent"
      :is="chartComponent"
      :data="currentData"
      v-bind="assembledProps"
    />
    <div v-else class="chart-fallback">
      <p>Component "{{ currentChart.componentName }}" not available</p>
    </div>
  </div>
</template>

<style scoped>
.chart-view {
  padding: var(--space-4);
  min-height: 200px;
}
.chart-fallback,
.chart-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}
</style>
