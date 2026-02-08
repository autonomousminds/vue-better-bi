import type { PropDefinition } from '../../types/playground.types';
import { formatOptions, colorScaleOptions } from './baseChartProps';

export const usMapProps: PropDefinition[] = [
  {
    name: 'colorScale', label: 'Color Scale', control: 'select', defaultValue: 'default', group: 'Map Style',
    options: colorScaleOptions,
  },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Map Style', options: formatOptions },
  { name: 'min', label: 'Min Value', control: 'number', defaultValue: undefined, group: 'Map Style' },
  { name: 'max', label: 'Max Value', control: 'number', defaultValue: undefined, group: 'Map Style' },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'legend', label: 'Legend', control: 'checkbox', defaultValue: true, group: 'Display' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '500px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
