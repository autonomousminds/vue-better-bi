import type { PropDefinition } from '../../types/playground.types';
import { formatOptions, colorPaletteOptions } from './baseChartProps';

export const pieChartProps: PropDefinition[] = [
  { name: 'donut', label: 'Donut', control: 'checkbox', defaultValue: false, group: 'Pie Style' },
  { name: 'innerRadius', label: 'Inner Radius %', control: 'number', defaultValue: 50, group: 'Pie Style', min: 0, max: 90, showWhen: (s) => s.donut === true },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: true, group: 'Pie Style' },
  {
    name: 'labelPosition', label: 'Label Position', control: 'select', defaultValue: 'outside', group: 'Pie Style',
    options: [
      { label: 'Outside', value: 'outside' },
      { label: 'Inside', value: 'inside' },
    ],
    showWhen: (s) => s.labels === true,
  },
  { name: 'showPercent', label: 'Show Percent', control: 'checkbox', defaultValue: true, group: 'Pie Style' },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Pie Style', options: formatOptions },
  {
    name: 'colorPalette', label: 'Color Palette', control: 'select', defaultValue: 'default', group: 'Pie Style',
    options: colorPaletteOptions,
  },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'legend', label: 'Legend', control: 'checkbox', defaultValue: true, group: 'Display' },
  {
    name: 'legendPosition', label: 'Legend Position', control: 'select', defaultValue: 'top', group: 'Display',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ]
  },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '400px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
