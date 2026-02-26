<script setup lang="ts">
/**
 * PointMap component
 * Map with point markers at lat/long coordinates
 * Uses Leaflet with CartoDB tile basemap
 *
 * Features:
 * - Color encoding by value column (numeric = gradient, categorical = discrete palette)
 * - Legend support (scalar gradient bar or categorical swatches)
 * - Configurable tooltip with custom column display and formatting
 * - Link prop for clickable points that navigate to a URL
 * - Selection state with visual feedback on click
 * - Empty data handling with optional message
 * - Column validation via checkInputs
 */

import { computed, watchEffect, ref, type Ref } from 'vue';
import chroma from 'chroma-js';
import type { PointMapProps, PointMapTooltipItem } from '../../types';
import LeafletBase from './LeafletBase.vue';
import MapLegend, { type CategoricalItem, type ScalarRange } from './MapLegend.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, getFormatObjectFromString } from '../../utils/formatting';
import { checkInputs } from '../../utils/checkInputs';
import { namedPalettes, namedScales } from '../../themes/colorPalettes';

const props = withDefaults(defineProps<PointMapProps>(), {
  height: '500px',
  width: '100%',
  pointOpacity: 0.8,
  pointSize: 8,
  borderColor: '#fff',
  borderWidth: 1,
  tooltipType: 'hover',
  legend: true,
  selectedColor: '#f59e0b',
  selectedBorderColor: '#d97706',
  selectedBorderWidth: 2,
  selectedOpacity: 1,
  emptySet: 'pass',
  downloadableData: true,
  downloadableImage: false
});

const { resolveColor } = useThemeStores();

// ============================================================================
// Validation
// ============================================================================

const validationError = computed<string | undefined>(() => {
  // Empty data is handled by emptyState, not validation
  if (!props.data?.length) return undefined;

  // Validate required columns exist in the data
  const result = checkInputs(props.data, [props.lat, props.long]);
  if (!result.valid) return result.error;

  // Validate optional columns exist in data
  const optionalCols = [props.value, props.name, props.link].filter(Boolean);
  if (optionalCols.length > 0) {
    const optResult = checkInputs(props.data, [], optionalCols as string[]);
    if (!optResult.valid) return optResult.error;
  }

  // Validate tooltip column references
  if (props.tooltip?.length) {
    const tooltipCols = props.tooltip.map((t) => t.id);
    const ttResult = checkInputs(props.data, [], tooltipCols);
    if (!ttResult.valid) return ttResult.error;
  }

  return undefined;
});

// ============================================================================
// Empty data handling
// ============================================================================

const isEmpty = computed(() => !props.data?.length);

const emptyState = computed<{ show: boolean; message?: string; isError: boolean }>(() => {
  if (!isEmpty.value) return { show: false, isError: false };

  const msg = props.emptyMessage ?? 'No data available';

  switch (props.emptySet) {
    case 'error':
      return { show: true, message: msg, isError: true };
    case 'warn':
      return { show: true, message: msg, isError: false };
    case 'pass':
    default:
      return { show: false, isError: false };
  }
});

// ============================================================================
// Color resolution
// ============================================================================

const pointColorResolved = computed(() =>
  props.pointColor ? resolveColor(props.pointColor).value : '#3366cc'
);

const DEFAULT_CATEGORICAL_PALETTE = namedPalettes.categorical;
const DEFAULT_SCALAR_COLORS = namedScales.default;

/**
 * Determines whether the value column is numeric or categorical.
 * If >80% of non-null values are numeric, treat as numeric.
 */
const valueColumnIsNumeric = computed<boolean>(() => {
  if (!props.value || !props.data?.length) return false;
  const col = props.value;
  let numCount = 0;
  let total = 0;
  for (const row of props.data) {
    const v = row[col];
    if (v == null) continue;
    total++;
    if (typeof v === 'number' || (typeof v === 'string' && !isNaN(Number(v)) && v.trim() !== '')) {
      numCount++;
    }
  }
  return total > 0 && numCount / total > 0.8;
});

/**
 * Effective legend type: auto-detect from data or use explicit prop.
 */
const effectiveLegendType = computed<'categorical' | 'scalar'>(() => {
  if (props.legendType) return props.legendType;
  return valueColumnIsNumeric.value ? 'scalar' : 'categorical';
});

/**
 * Color scale for numeric values.
 */
const numericColorScale = computed(() => {
  if (!props.value || !valueColumnIsNumeric.value || !props.data?.length) return null;

  const col = props.value;
  const values = props.data
    .map((row) => {
      const v = row[col];
      return typeof v === 'number' ? v : Number(v);
    })
    .filter((v) => !isNaN(v));

  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const scaleColors = props.colorPalette ?? DEFAULT_SCALAR_COLORS;
  const scale = chroma.scale(scaleColors).domain([min, max]);

  return { min, max, scale, scaleColors };
});

/**
 * Category-to-color mapping for categorical values.
 */
const categoricalColorMap = computed<Map<string, string>>(() => {
  const map = new Map<string, string>();
  if (!props.value || valueColumnIsNumeric.value || !props.data?.length) return map;

  const col = props.value;
  const categories: string[] = [];
  for (const row of props.data) {
    const v = row[col];
    const key = String(v ?? '');
    if (!categories.includes(key)) {
      categories.push(key);
    }
  }

  const palette = props.colorPalette ?? DEFAULT_CATEGORICAL_PALETTE;
  for (let i = 0; i < categories.length; i++) {
    map.set(categories[i], palette[i % palette.length]);
  }

  return map;
});

/**
 * Get the fill color for a single data point.
 */
function getPointColor(row: Record<string, unknown>): string {
  if (!props.value) return pointColorResolved.value as string;

  const rawVal = row[props.value];

  if (valueColumnIsNumeric.value && numericColorScale.value) {
    const numVal = typeof rawVal === 'number' ? rawVal : Number(rawVal);
    if (isNaN(numVal)) return '#999';
    return numericColorScale.value.scale(numVal).hex();
  }

  const key = String(rawVal ?? '');
  return categoricalColorMap.value.get(key) ?? '#999';
}

// ============================================================================
// Legend data
// ============================================================================

const showLegend = computed(() => props.legend && !!props.value);

const legendType = computed<'categorical' | 'scalar'>(() => effectiveLegendType.value);

const legendCategoricalItems = computed<CategoricalItem[]>(() => {
  if (legendType.value !== 'categorical') return [];
  const items: CategoricalItem[] = [];
  for (const [label, color] of categoricalColorMap.value) {
    items.push({ label, color });
  }
  return items;
});

const legendScalarRange = computed<ScalarRange | undefined>(() => {
  if (legendType.value !== 'scalar' || !numericColorScale.value) return undefined;
  const { min, max, scaleColors } = numericColorScale.value;
  const valFmt = props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined;
  return {
    min,
    max,
    minLabel: formatValue(min, valFmt),
    maxLabel: formatValue(max, valFmt),
    colors: scaleColors
  };
});

// ============================================================================
// Tooltip
// ============================================================================

/**
 * Build effective tooltip config: use user-provided tooltip or auto-build from name/value.
 */
const effectiveTooltipConfig = computed<PointMapTooltipItem[]>(() => {
  if (props.tooltip?.length) return props.tooltip;

  const items: PointMapTooltipItem[] = [];
  if (props.name) {
    items.push({ id: props.name, showColumnName: false });
  }
  if (props.value) {
    items.push({ id: props.value, fmt: props.valueFmt });
  }
  return items;
});

function buildTooltip(row: Record<string, unknown>): string {
  const items = effectiveTooltipConfig.value;
  if (items.length === 0) return '';

  let html = '';
  for (const item of items) {
    const rawVal = row[item.id];
    if (rawVal == null) continue;

    const displayTitle = item.title ?? item.id;
    const showLabel = item.showColumnName !== false;
    const fmt = item.fmt ? getFormatObjectFromString(item.fmt) : undefined;
    const formattedVal = fmt ? formatValue(rawVal, fmt) : String(rawVal);

    if (showLabel) {
      html += `<div class="tooltip-row"><span class="tooltip-label">${displayTitle}</span> <span>${formattedVal}</span></div>`;
    } else {
      // showColumnName=false: display the value prominently (e.g. for pointName)
      html += `<div class="tooltip-row"><span class="tooltip-label" style="font-weight:600">${formattedVal}</span></div>`;
    }
  }
  return html;
}

// ============================================================================
// Point data processing
// ============================================================================

const pointData = computed(() => {
  if (!props.data?.length || !props.lat || !props.long) return [];

  return props.data
    .map((row) => ({
      lat: row[props.lat] as number,
      lng: row[props.long] as number,
      value: props.value ? row[props.value] : undefined,
      name: props.name ? String(row[props.name]) : undefined,
      linkUrl: props.link ? (row[props.link] as string | undefined) : undefined,
      row
    }))
    .filter((d) => d.lat != null && d.lng != null && !isNaN(d.lat) && !isNaN(d.lng));
});

// ============================================================================
// Selection state
// ============================================================================

/**
 * Track the currently selected marker and its original styles so we can restore on deselect.
 */
const selectedIndex: Ref<number | null> = ref(null);

interface MarkerOriginalStyle {
  fillColor: string;
  fillOpacity: number;
  color: string;
  weight: number;
}

let markerRefs: Array<{ marker: import('leaflet').CircleMarker; original: MarkerOriginalStyle }> = [];

// ============================================================================
// Map rendering
// ============================================================================

const leafletBase = ref<InstanceType<typeof LeafletBase>>();

watchEffect(() => {
  const base = leafletBase.value;
  if (!base?.leaflet) return;

  const { mapReady, clearMarkers, addCircleMarker, fitBoundsToMarkers, updateMarkerStyle } =
    base.leaflet;

  // Wait until map is initialized
  if (!mapReady.value) return;

  // Skip rendering if there's a validation error or empty error state
  if (validationError.value || emptyState.value.isError) return;

  // Access reactive data (creates dependency)
  const data = pointData.value;
  const size = props.pointSize;
  const opacity = props.pointOpacity;
  const border = props.borderColor!;
  const borderW = props.borderWidth!;
  const ttType = props.tooltipType;

  // Selected styles
  const selColor = props.selectedColor!;
  const selBorderColor = props.selectedBorderColor!;
  const selBorderW = props.selectedBorderWidth!;
  const selOpacity = props.selectedOpacity!;

  clearMarkers();
  markerRefs = [];
  selectedIndex.value = null;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const fillColor = getPointColor(item.row);

    const originalStyle: MarkerOriginalStyle = {
      fillColor,
      fillOpacity: opacity,
      color: border,
      weight: borderW
    };

    const marker = addCircleMarker({
      lat: item.lat,
      lng: item.lng,
      radius: size,
      fillColor,
      fillOpacity: opacity,
      color: border,
      weight: borderW,
      opacity: 1,
      tooltipContent: buildTooltip(item.row),
      tooltipType: ttType,
      onClick: () => {
        // Handle link navigation
        if (props.link && item.linkUrl) {
          window.open(item.linkUrl, '_blank');
          return;
        }

        // Handle selection toggle
        const wasSelected = selectedIndex.value === i;

        // Restore previously selected marker
        if (selectedIndex.value != null && markerRefs[selectedIndex.value]) {
          const prev = markerRefs[selectedIndex.value];
          updateMarkerStyle(prev.marker, {
            fillColor: prev.original.fillColor,
            fillOpacity: prev.original.fillOpacity,
            color: prev.original.color,
            weight: prev.original.weight
          });
        }

        if (wasSelected) {
          // Deselect
          selectedIndex.value = null;
        } else {
          // Select new marker
          selectedIndex.value = i;
          if (markerRefs[i]) {
            updateMarkerStyle(markerRefs[i].marker, {
              fillColor: selColor,
              fillOpacity: selOpacity,
              color: selBorderColor,
              weight: selBorderW
            });
          }
        }
      }
    });

    if (marker) {
      markerRefs.push({ marker, original: originalStyle });
    }
  }

  // Auto-fit bounds unless user set explicit starting coordinates
  if (props.startingLat == null && props.startingLong == null) {
    fitBoundsToMarkers(props.startingZoom);
  }
});
</script>

<template>
  <!-- Validation error -->
  <div v-if="validationError" class="point-map-error">
    {{ validationError }}
  </div>

  <!-- Empty data error state -->
  <div v-else-if="emptyState.isError" class="point-map-error">
    {{ emptyState.message }}
  </div>

  <!-- Normal rendering -->
  <div v-else class="point-map-wrapper" :style="{ width: props.width, position: 'relative' }">
    <LeafletBase
      ref="leafletBase"
      :title="props.title"
      :title-icon="props.titleIcon"
      :subtitle="props.subtitle"
      :height="props.height"
      :width="'100%'"
      :basemap="props.basemap"
      :starting-lat="props.startingLat"
      :starting-long="props.startingLong"
      :starting-zoom="props.startingZoom"
      :background-color="props.backgroundColor"
      :data="props.data"
      :downloadable-data="props.downloadableData"
      :downloadable-image="props.downloadableImage"
      :chart-title="props.title"
    />

    <!-- Empty data warning overlay -->
    <div v-if="emptyState.show && !emptyState.isError" class="point-map-empty-overlay">
      {{ emptyState.message }}
    </div>

    <!-- Map legend -->
    <MapLegend
      v-if="showLegend && legendType === 'categorical' && legendCategoricalItems.length > 0"
      type="categorical"
      :position="props.legendPosition"
      :items="legendCategoricalItems"
    />
    <MapLegend
      v-if="showLegend && legendType === 'scalar' && legendScalarRange"
      type="scalar"
      :position="props.legendPosition"
      :range="legendScalarRange"
    />
  </div>
</template>

<style scoped>
.point-map-wrapper {
  position: relative;
}

.point-map-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #dc2626;
  font-size: 13px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 16px;
}

.point-map-empty-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  color: #666;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 4px;
  pointer-events: none;
}
</style>
