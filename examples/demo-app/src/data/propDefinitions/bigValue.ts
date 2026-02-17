import type { PropDefinition } from '../../types/playground.types';
import { formatOptions } from './baseChartProps';

const aggOptions = [
  { label: 'None (first row)', value: '' },
  { label: 'Sum', value: 'sum' },
  { label: 'Mean', value: 'mean' },
  { label: 'Median', value: 'median' },
  { label: 'Min', value: 'min' },
  { label: 'Max', value: 'max' },
  { label: 'Count', value: 'count' },
  { label: 'Count Distinct', value: 'countDistinct' },
];

export const bigValueProps: PropDefinition[] = [
  // Core
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'agg', label: 'Aggregation', control: 'select', defaultValue: 'sum', group: 'Core', options: aggOptions },
  { name: 'fmt', label: 'Value Format', control: 'select', defaultValue: 'num0', group: 'Core', options: formatOptions },
  { name: 'link', label: 'Link URL', control: 'text', defaultValue: '', group: 'Core' },
  { name: 'minWidth', label: 'Min Width', control: 'text', defaultValue: '18%', group: 'Core' },
  { name: 'maxWidth', label: 'Max Width', control: 'text', defaultValue: 'none', group: 'Core' },

  // Comparison
  { name: 'comparisonAgg', label: 'Comparison Aggregation', control: 'select', defaultValue: 'sum', group: 'Comparison', options: aggOptions },
  { name: 'comparisonDelta', label: 'Show as Delta', control: 'checkbox', defaultValue: true, group: 'Comparison' },
  {
    name: 'comparisonDisplay', label: 'Comparison Display', control: 'select', defaultValue: 'percent', group: 'Comparison',
    options: [
      { label: 'Percent', value: 'percent' },
      { label: 'Absolute', value: 'absolute' },
    ],
  },
  { name: 'comparisonFmt', label: 'Comparison Format', control: 'select', defaultValue: '', group: 'Comparison', options: formatOptions },
  { name: 'comparisonTitle', label: 'Comparison Title', control: 'text', defaultValue: '', group: 'Comparison' },
  { name: 'downIsGood', label: 'Down is Good', control: 'checkbox', defaultValue: false, group: 'Comparison' },
  { name: 'neutralMin', label: 'Neutral Min', control: 'number', defaultValue: 0, group: 'Comparison', min: -1, max: 1, step: 0.01 },
  { name: 'neutralMax', label: 'Neutral Max', control: 'number', defaultValue: 0, group: 'Comparison', min: -1, max: 1, step: 0.01 },

  // Sparkline
  {
    name: 'sparklineType', label: 'Sparkline Type', control: 'select', defaultValue: 'line', group: 'Sparkline',
    options: [
      { label: 'Line', value: 'line' },
      { label: 'Area', value: 'area' },
      { label: 'Bar', value: 'bar' },
    ],
  },
  { name: 'sparklineY', label: 'Sparkline Y Column', control: 'text', defaultValue: '', group: 'Sparkline' },
  { name: 'sparklineColor', label: 'Sparkline Color', control: 'color', defaultValue: '', group: 'Sparkline' },
  { name: 'sparklineYScale', label: 'Y Scale', control: 'checkbox', defaultValue: false, group: 'Sparkline' },
  { name: 'sparklineValueFmt', label: 'Value Format', control: 'select', defaultValue: '', group: 'Sparkline', options: formatOptions },
  { name: 'sparklineDateFmt', label: 'Date Format', control: 'select', defaultValue: '', group: 'Sparkline', options: formatOptions },
];
