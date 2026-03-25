import type { PropDefinition } from '../../types/playground.types';
import { baseChartPropDefs } from './baseChartProps';

const barWithTableSpecificProps: PropDefinition[] = [
  {
    name: 'type', label: 'Stack Type', control: 'select', defaultValue: 'grouped', group: 'Bar Style',
    options: [
      { label: 'Grouped', value: 'grouped' },
      { label: 'Stacked', value: 'stacked' },
      { label: 'Stacked 100%', value: 'stacked100' },
    ]
  },
  { name: 'fillOpacity', label: 'Fill Opacity', control: 'slider', defaultValue: 1, group: 'Bar Style', min: 0, max: 1, step: 0.05 },
  { name: 'labels', label: 'Show Labels', control: 'checkbox', defaultValue: false, group: 'Bar Style' },
];

// Override table defaults so this example starts with a nicely styled attached table
const basePropsWithTableDefaults = baseChartPropDefs.map(p => {
  if (p.name === 'table') {
    return {
      ...p,
      defaultValue: 'bottom',
      subProps: p.subProps?.map(sub => {
        if (sub.name === 'rows') return { ...sub, defaultValue: 10 };
        if (sub.name === 'search') return { ...sub, defaultValue: true };
        if (sub.name === 'rowShading') return { ...sub, defaultValue: true };
        if (sub.name === 'rowLines') return { ...sub, defaultValue: false };
        if (sub.name === 'totalRow') return { ...sub, defaultValue: true };
        if (sub.name === 'headerColor') return { ...sub, defaultValue: '#1e3a5f' };
        if (sub.name === 'headerFontColor') return { ...sub, defaultValue: '#ffffff' };
        if (sub.name === 'wrapTitles') return { ...sub, defaultValue: true };
        return sub;
      }),
    };
  }
  if (p.name === 'title') return { ...p, defaultValue: 'Brand Sales & Profitability' };
  if (p.name === 'yFmt') return { ...p, defaultValue: 'usd0' };
  return p;
});

export const barChartWithTableProps: PropDefinition[] = [...barWithTableSpecificProps, ...basePropsWithTableDefaults];
