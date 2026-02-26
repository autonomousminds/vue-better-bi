<script setup lang="ts">
/**
 * MapLegend component
 * Renders a legend overlay on top of Leaflet maps.
 * Supports both categorical (discrete color swatches) and scalar (gradient bar) legends.
 * Ported from Evidence's map legend patterns.
 */

export interface CategoricalItem {
  label: string;
  color: string;
}

export interface ScalarRange {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  colors: string[];
}

interface Props {
  /** Legend type */
  type: 'categorical' | 'scalar';
  /** Position on the map */
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /** Items for categorical legend */
  items?: CategoricalItem[];
  /** Range for scalar legend */
  range?: ScalarRange;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottomLeft'
});

const positionClasses: Record<string, Record<string, string>> = {
  topLeft: { top: '10px', left: '10px' },
  topRight: { top: '10px', right: '10px' },
  bottomLeft: { bottom: '10px', left: '10px' },
  bottomRight: { bottom: '10px', right: '10px' }
};

function getPositionStyle(): Record<string, string> {
  return positionClasses[props.position] ?? positionClasses.bottomLeft;
}

function getGradientStyle(): string {
  if (!props.range?.colors?.length) return '';
  return `linear-gradient(to right, ${props.range.colors.join(', ')})`;
}
</script>

<template>
  <div
    class="map-legend"
    :class="type"
    :style="getPositionStyle()"
  >
    <!-- Scalar / continuous legend -->
    <template v-if="type === 'scalar' && range">
      <div
        class="gradient-bar"
        :style="{ background: getGradientStyle() }"
      />
      <div class="gradient-labels">
        <span>{{ range.minLabel }}</span>
        <span>{{ range.maxLabel }}</span>
      </div>
    </template>

    <!-- Categorical legend -->
    <template v-if="type === 'categorical' && items?.length">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="legend-item"
      >
        <span
          class="legend-swatch"
          :style="{ backgroundColor: item.color }"
        />
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.map-legend {
  position: absolute;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 11px;
  line-height: 1.4;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  max-width: 200px;
}

/* Scalar / gradient legend */
.gradient-bar {
  width: 120px;
  height: 10px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.gradient-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  color: #555;
  font-size: 10px;
}

/* Categorical legend */
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 1px 0;
}

.legend-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.legend-label {
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
