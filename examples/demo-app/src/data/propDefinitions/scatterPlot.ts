import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const scatterSpecificProps: PropDefinition[] = [
  { name: 'pointSize', label: 'Point Size', control: 'number', defaultValue: 10, group: 'Point Style', min: 2, max: 30 },
  { name: 'pointOpacity', label: 'Point Opacity', control: 'slider', defaultValue: 0.7, group: 'Point Style', min: 0, max: 1, step: 0.05 },
  {
    name: 'pointShape', label: 'Point Shape', control: 'select', defaultValue: 'circle', group: 'Point Style',
    options: [
      { label: 'Circle', value: 'circle' },
      { label: 'Rectangle', value: 'rect' },
      { label: 'Triangle', value: 'triangle' },
      { label: 'Diamond', value: 'diamond' },
      { label: 'Pin', value: 'pin' },
    ]
  },
  { name: 'pointColor', label: 'Point Color', control: 'color', defaultValue: '', group: 'Point Style' },
  { name: 'outlineWidth', label: 'Outline Width', control: 'number', defaultValue: 1, group: 'Point Style', min: 0, max: 5 },
  { name: 'outlineColor', label: 'Outline Color', control: 'color', defaultValue: '', group: 'Point Style' },
];

export const scatterPlotProps: PropDefinition[] = [...scatterSpecificProps, ...baseChartPropDefs];
