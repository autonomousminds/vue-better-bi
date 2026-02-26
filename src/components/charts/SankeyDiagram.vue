<script setup lang="ts">
/**
 * SankeyDiagram component
 * Flow visualization showing relationships and quantities
 *
 * Ported from Evidence's _SankeyDiagram.svelte with support for:
 * - Default column names (source/target/value)
 * - Node label modes (name/value/full/none)
 * - Per-node palette coloring
 * - Edge/link labels (value/percent/full/none)
 * - Link color control (source/target/gradient/custom)
 * - Sort control
 * - Depth override
 * - Outline styling
 * - formatTitle for node names
 */

import { computed, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { SankeyDiagramProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatTitle, getFormatObjectFromString, fmt } from '../../utils/formatting';

const props = withDefaults(defineProps<SankeyDiagramProps>(), {
  // Fix #1: Default column names matching Evidence defaults
  source: 'source',
  target: 'target',
  value: 'value',
  height: '400px',
  width: '100%',
  orient: 'horizontal',
  nodeWidth: 20,
  nodeGap: 8,
  nodeAlign: 'justify',
  // Fix #2: Node labels default to 'name'
  nodeLabels: 'name',
  // Fix #5: Link color default to 'gradient' (Evidence uses 'base-content-muted' but gradient is more common in Vue version)
  linkColor: 'gradient',
  // Fix #6: Sort default to false (matches Evidence)
  sort: false,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorPalette, resolveColor } = useThemeStores();

// Resolve colors
const colorPaletteResolved = computed(() =>
  resolveColorPalette(props.colorPalette || 'default').value
);

// Fix #5: Resolve link color (supports theme color names like 'source', 'target', 'gradient', or custom colors)
const resolvedLinkColor = computed(() => {
  const lc = props.linkColor;
  // ECharts built-in sankey link color modes
  if (lc === 'source' || lc === 'target' || lc === 'gradient') {
    return lc;
  }
  // Otherwise resolve as a theme color
  return resolveColor(lc).value ?? lc;
});

// Fix #8: Resolve outline color
const resolvedOutlineColor = computed(() => {
  if (!props.outlineColor) return undefined;
  return resolveColor(props.outlineColor).value ?? props.outlineColor;
});

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Compute total value for percent calculations
const totalValue = computed(() => {
  if (!props.data?.length) return 0;
  const valueCol = props.value;
  // Sum all link values for percent calculations
  return props.data.reduce((sum, row) => sum + (Number(row[valueCol]) || 0), 0);
});

// Process sankey data
const sankeyData = computed(() => {
  const sourceCol = props.source;
  const targetCol = props.target;
  const valueCol = props.value;

  if (!props.data?.length || !sourceCol || !targetCol || !valueCol) {
    return { nodes: [], links: [] };
  }

  // Collect unique nodes (preserving insertion order)
  const nodeNames: string[] = [];
  const nodeSet = new Set<string>();
  const links: { source: string; target: string; value: number }[] = [];

  for (const row of props.data) {
    const source = String(row[sourceCol]);
    const target = String(row[targetCol]);
    const value = Number(row[valueCol]) || 0;

    if (!nodeSet.has(source)) {
      nodeSet.add(source);
      nodeNames.push(source);
    }
    if (!nodeSet.has(target)) {
      nodeSet.add(target);
      nodeNames.push(target);
    }

    links.push({ source, target, value });
  }

  const palette = colorPaletteResolved.value;

  // Fix #3: Per-node palette coloring + Fix #7: Depth override
  const nodes = nodeNames.map((name, index) => {
    const node: { name: string; itemStyle: { color?: string; borderColor?: string; borderWidth?: number }; depth?: number } = {
      name,
      itemStyle: {
        color: palette ? palette[index % palette.length] : undefined,
        // Fix #8: Outline styling
        borderColor: resolvedOutlineColor.value as string | undefined,
        borderWidth: props.outlineWidth
      }
    };

    // Fix #7: Depth override
    if (props.depthOverride && Object.prototype.hasOwnProperty.call(props.depthOverride, name)) {
      node.depth = props.depthOverride[name];
    }

    return node;
  });

  return { nodes, links };
});

// Helper to format a node name: apply seriesLabelFmt if provided, otherwise formatTitle
function formatNodeName(rawName: string): string {
  if (props.seriesLabelFmt) {
    return fmt(rawName, props.seriesLabelFmt);
  }
  return formatTitle(rawName);
}

// Fix #2: Node label formatter
function nodeLabelsFormatter(params: { data: { name: string }; value: number }): string {
  const name = formatNodeName(params.data.name);
  const nodeLabels = props.nodeLabels;

  switch (nodeLabels) {
    case 'value':
      return formatValue(params.value, valueFormat.value);
    case 'full':
      return `${name} (${formatValue(params.value, valueFormat.value)})`;
    case 'none':
      return '';
    case 'name':
    default:
      return name;
  }
}

// Fix #4: Edge/link label formatter
function edgeLabelFormatter(params: { data: { value: number; source: string; target: string } }): string {
  const linkLabels = props.linkLabels;
  const val = params.data.value;

  switch (linkLabels) {
    case 'value':
      return formatValue(val, valueFormat.value);
    case 'percent': {
      const total = totalValue.value;
      const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';
      return `${pct}%`;
    }
    case 'full': {
      const total2 = totalValue.value;
      const pct2 = total2 > 0 ? ((val / total2) * 100).toFixed(1) : '0.0';
      return `${formatValue(val, valueFormat.value)} (${pct2}%)`;
    }
    case 'none':
    default:
      return '';
  }
}

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { nodes, links } = sankeyData.value;

  const showNodeLabels = props.nodeLabels !== 'none';
  const showEdgeLabels = props.linkLabels != null && props.linkLabels !== 'none';

  // Fix #6: Sort control - layoutIterations controls sorting
  const layoutIterations = props.sort ? 32 : 0;

  const seriesConfig: Record<string, unknown> = {
    type: 'sankey',
    orient: props.orient,
    nodeWidth: props.nodeWidth,
    nodeGap: props.nodeGap,
    nodeAlign: props.nodeAlign,
    layoutIterations,
    left: '10%',
    right: '15%',
    top: 20,
    bottom: props.orient === 'vertical' ? 0 : 10,
    width: '70%',
    data: nodes,
    links: links,
    emphasis: {
      focus: 'adjacency'
    },
    // Fix #5: Link color control
    lineStyle: {
      color: resolvedLinkColor.value,
      curveness: 0.5
    },
    // Fix #2: Node labels with formatTitle
    label: {
      show: showNodeLabels,
      position: props.orient === 'horizontal' ? 'right' : 'top',
      fontSize: props.orient === 'vertical' ? 10.5 : 12,
      formatter: nodeLabelsFormatter
    },
    // Fix #4: Edge/link labels
    edgeLabel: {
      show: showEdgeLabels,
      color: 'black',
      textBorderColor: 'white',
      textBorderWidth: 2,
      formatter: showEdgeLabels ? edgeLabelFormatter : undefined
    },
    labelLayout: {
      hideOverlap: true
    },
    // Fix #9: Tooltip with formatTitle for node names (respects seriesLabelFmt)
    tooltip: {
      formatter: (params: unknown) => {
        const p = params as { data: { source?: string; target?: string; value?: number; name?: string }; value?: number };
        if (p.data.name) {
          // Node tooltip
          return `<span style='font-weight: 600'>${formatNodeName(p.data.name)}</span><br/> ${formatValue(p.value, valueFormat.value)}`;
        } else {
          // Link tooltip
          return `<span style='font-weight: 600'>${formatNodeName(p.data.source || '')} &rarr; ${formatNodeName(p.data.target || '')}</span><br/> ${formatValue(p.data.value, valueFormat.value)}`;
        }
      },
      extraCssText: 'box-shadow: 0 3px 6px rgba(0,0,0,.15); box-shadow: 0 2px 4px rgba(0,0,0,.12); z-index: 1;'
    },
    animationDuration: 500
  };

  return {
    tooltip: {
      trigger: 'item' as const,
      triggerOn: 'mousemove'
    },
    series: [seriesConfig],
    color: colorPaletteResolved.value
  };
});

const hovering = ref(false);
</script>

<template>
  <EChartsBase
    :config="chartConfig"
    :data="props.data"
    :title="props.title"
    :title-icon="props.titleIcon"
    :subtitle="props.subtitle"
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
