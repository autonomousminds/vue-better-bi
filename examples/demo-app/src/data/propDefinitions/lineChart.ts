import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const lineSpecificProps: PropDefinition[] = [
  {
    name: 'lineType', label: 'Line Type', control: 'select', defaultValue: 'solid', group: 'Line Style',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Dashed', value: 'dashed' },
      { label: 'Dotted', value: 'dotted' },
    ]
  },
  { name: 'lineWidth', label: 'Line Width', control: 'number', defaultValue: 2, group: 'Line Style', min: 1, max: 8 },
  { name: 'lineOpacity', label: 'Line Opacity', control: 'slider', defaultValue: 1, group: 'Line Style', min: 0, max: 1, step: 0.05 },
  { name: 'lineColor', label: 'Line Color', control: 'color', defaultValue: '', group: 'Line Style' },
  { name: 'markers', label: 'Show Markers', control: 'checkbox', defaultValue: false, group: 'Line Style' },
  {
    name: 'markerShape', label: 'Marker Shape', control: 'select', defaultValue: 'circle', group: 'Line Style',
    options: [
      { label: 'Circle', value: 'circle' },
      { label: 'Rectangle', value: 'rect' },
      { label: 'Triangle', value: 'triangle' },
      { label: 'Diamond', value: 'diamond' },
      { label: 'Pin', value: 'pin' },
      { label: 'Arrow', value: 'arrow' },
    ],
    showWhen: (s) => s.markers === true,
  },
  { name: 'markerSize', label: 'Marker Size', control: 'number', defaultValue: 8, group: 'Line Style', min: 2, max: 20, showWhen: (s) => s.markers === true },
  {
    name: 'handleMissing', label: 'Handle Missing', control: 'select', defaultValue: 'gap', group: 'Line Style',
    options: [
      { label: 'Gap', value: 'gap' },
      { label: 'Connect', value: 'connect' },
      { label: 'Zero', value: 'zero' },
    ]
  },
  { name: 'step', label: 'Step Line', control: 'checkbox', defaultValue: false, group: 'Line Style' },
  {
    name: 'stepPosition', label: 'Step Position', control: 'select', defaultValue: 'middle', group: 'Line Style',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Middle', value: 'middle' },
      { label: 'End', value: 'end' },
    ],
    showWhen: (s) => s.step === true,
  },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: false, group: 'Line Style' },
];

export const lineChartProps: PropDefinition[] = [...lineSpecificProps, ...baseChartPropDefs];
