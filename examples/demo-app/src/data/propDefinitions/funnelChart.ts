import type { PropDefinition } from '../../types/playground.types';
import { formatOptions, colorPaletteOptions } from './baseChartProps';

export const funnelChartProps: PropDefinition[] = [
  { name: 'showPercent', label: 'Show Percent', control: 'checkbox', defaultValue: true, group: 'Funnel Style' },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Funnel Style', options: formatOptions },
  {
    name: 'colorPalette', label: 'Color Palette', control: 'select', defaultValue: 'default', group: 'Funnel Style',
    options: colorPaletteOptions,
  },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'legend', label: 'Legend', control: 'checkbox', defaultValue: true, group: 'Display' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '400px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
