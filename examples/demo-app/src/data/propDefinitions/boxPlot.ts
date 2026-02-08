import type { PropDefinition } from '../../types/playground.types';
import { titleProps, displayProps, formatProps, exportProps } from './baseChartProps';

const boxPlotSpecificProps: PropDefinition[] = [
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 0.8, group: 'Box Style', min: 0, max: 1, step: 0.05 },
  { name: 'fillColor', label: 'Fill Color', control: 'color', defaultValue: '', group: 'Box Style' },
  { name: 'outlineWidth', label: 'Outline Width', control: 'number', defaultValue: 1.5, group: 'Box Style', min: 0, max: 5, step: 0.5 },
  { name: 'outlineColor', label: 'Outline Color', control: 'color', defaultValue: '', group: 'Box Style' },
];

export const boxPlotProps: PropDefinition[] = [
  ...boxPlotSpecificProps,
  ...titleProps,
  ...formatProps,
  ...displayProps,
  ...exportProps,
];
