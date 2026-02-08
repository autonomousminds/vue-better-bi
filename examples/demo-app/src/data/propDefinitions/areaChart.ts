import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const areaSpecificProps: PropDefinition[] = [
  {
    name: 'type', label: 'Stack Type', control: 'select', defaultValue: 'stacked', group: 'Area Style',
    options: [
      { label: 'Stacked', value: 'stacked' },
      { label: 'Stacked 100%', value: 'stacked100' },
    ]
  },
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 0.7, group: 'Area Style', min: 0, max: 1, step: 0.05 },
  { name: 'fillColor', label: 'Fill Color', control: 'color', defaultValue: '', group: 'Area Style' },
  {
    name: 'lineType', label: 'Line Type', control: 'select', defaultValue: 'solid', group: 'Area Style',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Dashed', value: 'dashed' },
      { label: 'Dotted', value: 'dotted' },
    ]
  },
  { name: 'lineWidth', label: 'Line Width', control: 'number', defaultValue: 2, group: 'Area Style', min: 1, max: 8 },
  { name: 'markers', label: 'Show Markers', control: 'checkbox', defaultValue: false, group: 'Area Style' },
  {
    name: 'markerShape', label: 'Marker Shape', control: 'select', defaultValue: 'circle', group: 'Area Style',
    options: [
      { label: 'Circle', value: 'circle' },
      { label: 'Rectangle', value: 'rect' },
      { label: 'Triangle', value: 'triangle' },
      { label: 'Diamond', value: 'diamond' },
    ],
    showWhen: (s) => s.markers === true,
  },
  { name: 'markerSize', label: 'Marker Size', control: 'number', defaultValue: 8, group: 'Area Style', min: 2, max: 20, showWhen: (s) => s.markers === true },
  {
    name: 'handleMissing', label: 'Handle Missing', control: 'select', defaultValue: 'gap', group: 'Area Style',
    options: [
      { label: 'Gap', value: 'gap' },
      { label: 'Connect', value: 'connect' },
      { label: 'Zero', value: 'zero' },
    ]
  },
  { name: 'step', label: 'Step Line', control: 'checkbox', defaultValue: false, group: 'Area Style' },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: false, group: 'Area Style' },
];

export const areaChartProps: PropDefinition[] = [...areaSpecificProps, ...baseChartPropDefs];
