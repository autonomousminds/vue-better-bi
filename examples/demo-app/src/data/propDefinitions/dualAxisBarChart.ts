import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs, y2AxisProps } from './baseChartProps';

const barSpecificProps: PropDefinition[] = [
  {
    name: 'type', label: 'Stack Type', control: 'select', defaultValue: 'grouped', group: 'Bar Style',
    options: [
      { label: 'Grouped', value: 'grouped' },
      { label: 'Stacked', value: 'stacked' },
      { label: 'Stacked 100%', value: 'stacked100' },
    ]
  },
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 1, group: 'Bar Style', min: 0, max: 1, step: 0.05 },
  { name: 'fillColor', label: 'Fill Color', control: 'color', defaultValue: '', group: 'Bar Style' },
  { name: 'outlineWidth', label: 'Outline Width', control: 'number', defaultValue: 0, group: 'Bar Style', min: 0, max: 5 },
  { name: 'outlineColor', label: 'Outline Color', control: 'color', defaultValue: '', group: 'Bar Style' },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: false, group: 'Bar Style' },
  {
    name: 'labelPosition', label: 'Label Position', control: 'select', defaultValue: 'outside', group: 'Bar Style',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Inside', value: 'inside' },
      { label: 'Outside', value: 'outside' },
    ],
    showWhen: (s) => s.labels === true,
  },
  { name: 'labelSize', label: 'Label Size', control: 'number', defaultValue: 12, group: 'Bar Style', min: 8, max: 24, showWhen: (s) => s.labels === true },
  { name: 'stackTotalLabel', label: 'Stack Total Label', control: 'checkbox', defaultValue: false, group: 'Bar Style' },
];

const dualAxisY2Props: PropDefinition[] = [
  {
    name: 'y2', label: 'Y2 Column', control: 'select', defaultValue: 'profit_margin', group: 'Secondary Y-Axis',
    options: [
      { label: 'None', value: '' },
      { label: 'profit_margin', value: 'profit_margin' },
      { label: 'gross_profit', value: 'gross_profit' },
    ]
  },
  {
    name: 'y2SeriesType', label: 'Y2 Series Type', control: 'select', defaultValue: 'line', group: 'Secondary Y-Axis',
    options: [
      { label: 'Line', value: 'line' },
      { label: 'Bar', value: 'bar' },
    ],
    showWhen: (s) => !!s.y2,
  },
  { name: 'y2Scale', label: 'Y2 Scale (Auto)', control: 'checkbox', defaultValue: true, group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  ...y2AxisProps,
];

// Override base title/format defaults for this chart
const basePropsCopy = baseChartPropDefs.map((p) => {
  if (p.name === 'yAxisTitle') return { ...p, defaultValue: 'Revenue' };
  if (p.name === 'yFmt') return { ...p, defaultValue: 'usd0m' };
  if (p.name === 'showAllXAxisLabels') return { ...p, defaultValue: true };
  if (p.name === 'xAxisLabelRotate') return { ...p, defaultValue: 45 };
  return p;
});

// Override y2 defaults
const y2PropsCopy = dualAxisY2Props.map((p) => {
  if (p.name === 'y2Fmt') return { ...p, defaultValue: 'pct0' };
  if (p.name === 'y2AxisTitle') return { ...p, defaultValue: 'Profit Margin' };
  return p;
});

export const dualAxisBarChartProps: PropDefinition[] = [...barSpecificProps, ...basePropsCopy, ...y2PropsCopy];
