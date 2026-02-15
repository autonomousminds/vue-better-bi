import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs, y2AxisProps } from './baseChartProps';

const barSpecificProps: PropDefinition[] = [
  {
    name: 'type', label: 'Stack Type', control: 'select', defaultValue: 'stacked', group: 'Bar Style',
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

const barY2Props: PropDefinition[] = [
  {
    name: 'y2', label: 'Y2 Column', control: 'select', defaultValue: '', group: 'Secondary Y-Axis',
    options: [
      { label: 'None', value: '' },
      { label: 'orders', value: 'orders' },
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
  ...y2AxisProps,
];

export const barChartProps: PropDefinition[] = [...barSpecificProps, ...baseChartPropDefs, ...barY2Props];
