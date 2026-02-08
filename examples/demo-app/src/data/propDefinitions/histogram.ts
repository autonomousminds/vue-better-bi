import type { PropDefinition } from '../../types/playground.types';
import { titleProps, displayProps, formatProps, exportProps, xAxisProps, yAxisProps } from './baseChartProps';

const histogramSpecificProps: PropDefinition[] = [
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 1, group: 'Histogram Style', min: 0, max: 1, step: 0.05 },
  { name: 'fillColor', label: 'Fill Color', control: 'color', defaultValue: '', group: 'Histogram Style' },
];

export const histogramProps: PropDefinition[] = [
  ...histogramSpecificProps,
  ...titleProps,
  ...formatProps,
  ...xAxisProps,
  ...yAxisProps,
  ...displayProps,
  ...exportProps,
];
