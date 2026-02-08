import type { PropDefinition } from '../../types/playground.types';
import { formatOptions, colorScaleOptions } from './baseChartProps';

export const heatmapProps: PropDefinition[] = [
  { name: 'valueLabels', label: 'Value Labels', control: 'checkbox', defaultValue: true, group: 'Heatmap Style' },
  { name: 'mobileValueLabels', label: 'Mobile Value Labels', control: 'checkbox', defaultValue: false, group: 'Heatmap Style' },
  { name: 'nullsZero', label: 'Nulls as Zero', control: 'checkbox', defaultValue: false, group: 'Heatmap Style' },
  { name: 'zeroDisplay', label: 'Zero Display', control: 'text', defaultValue: '—', group: 'Heatmap Style' },
  {
    name: 'colorScale', label: 'Color Scale', control: 'select', defaultValue: 'default', group: 'Heatmap Style',
    options: colorScaleOptions,
  },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Heatmap Style', options: formatOptions },
  { name: 'min', label: 'Min Value', control: 'number', defaultValue: undefined, group: 'Heatmap Style' },
  { name: 'max', label: 'Max Value', control: 'number', defaultValue: undefined, group: 'Heatmap Style' },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'legend', label: 'Legend', control: 'checkbox', defaultValue: true, group: 'Display' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '400px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
