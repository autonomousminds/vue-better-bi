import type { PropDefinition } from '../../types/playground.types';
import { formatOptions, colorPaletteOptions } from './baseChartProps';

export const sankeyDiagramProps: PropDefinition[] = [
  {
    name: 'orient', label: 'Orientation', control: 'select', defaultValue: 'horizontal', group: 'Sankey Style',
    options: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ]
  },
  { name: 'nodeWidth', label: 'Node Width', control: 'number', defaultValue: 20, group: 'Sankey Style', min: 5, max: 50 },
  { name: 'nodeGap', label: 'Node Gap', control: 'number', defaultValue: 8, group: 'Sankey Style', min: 1, max: 30 },
  {
    name: 'nodeAlign', label: 'Node Align', control: 'select', defaultValue: 'justify', group: 'Sankey Style',
    options: [
      { label: 'Justify', value: 'justify' },
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ]
  },
  { name: 'valueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Sankey Style', options: formatOptions },
  {
    name: 'colorPalette', label: 'Color Palette', control: 'select', defaultValue: 'default', group: 'Sankey Style',
    options: colorPaletteOptions,
  },
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '400px', group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
];
