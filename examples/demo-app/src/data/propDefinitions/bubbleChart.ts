import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const bubbleSpecificProps: PropDefinition[] = [
  { name: 'minSize', label: 'Min Size', control: 'number', defaultValue: 5, group: 'Bubble Style', min: 1, max: 20 },
  { name: 'maxSize', label: 'Max Size', control: 'number', defaultValue: 50, group: 'Bubble Style', min: 10, max: 100 },
  { name: 'pointOpacity', label: 'Point Opacity', control: 'slider', defaultValue: 0.7, group: 'Bubble Style', min: 0, max: 1, step: 0.05 },
  { name: 'pointColor', label: 'Point Color', control: 'color', defaultValue: '', group: 'Bubble Style' },
  { name: 'outlineWidth', label: 'Outline Width', control: 'number', defaultValue: 1, group: 'Bubble Style', min: 0, max: 5 },
  { name: 'outlineColor', label: 'Outline Color', control: 'color', defaultValue: '', group: 'Bubble Style' },
];

export const bubbleChartProps: PropDefinition[] = [...bubbleSpecificProps, ...baseChartPropDefs];
