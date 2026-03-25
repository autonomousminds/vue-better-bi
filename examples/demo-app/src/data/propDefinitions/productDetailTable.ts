import type { PropDefinition } from '../../types/playground.types';

export const productDetailTableProps: PropDefinition[] = [
  // ─── Core ────────────────────────────────────────────────────────────
  {
    name: 'rows', label: 'Rows Per Page', control: 'number',
    defaultValue: 40, group: 'Core', min: 1, max: 100, step: 1,
    description: 'Number of rows to display per page',
  },
  {
    name: 'title', label: 'Title', control: 'text',
    defaultValue: '', group: 'Core',
    description: 'Table title displayed above the table',
  },
  {
    name: 'subtitle', label: 'Subtitle', control: 'text',
    defaultValue: '', group: 'Core',
    description: 'Subtitle displayed below the title',
  },
  {
    name: 'rowNumbers', label: 'Row Numbers', control: 'checkbox',
    defaultValue: false, group: 'Core',
  },
  {
    name: 'search', label: 'Search', control: 'checkbox',
    defaultValue: true, group: 'Core',
    description: 'Enable client-side search bar',
  },
  {
    name: 'sortable', label: 'Sortable', control: 'checkbox',
    defaultValue: true, group: 'Core',
  },
  {
    name: 'downloadable', label: 'Downloadable', control: 'checkbox',
    defaultValue: true, group: 'Core',
  },
  {
    name: 'sort', label: 'Default Sort', control: 'text',
    defaultValue: 'revenue desc', group: 'Core',
    description: 'Default sort: "column_name" or "column_name desc"',
  },

  // ─── Grouping ────────────────────────────────────────────────────────
  {
    name: 'groupBy', label: 'Group By', control: 'select',
    defaultValue: 'product_category_name', group: 'Grouping',
    options: [
      { label: 'None', value: '' },
      { label: 'Product Category', value: 'product_category_name' },
    ],
    description: 'Column to group rows by',
  },
  {
    name: 'groupType', label: 'Group Type', control: 'select',
    defaultValue: 'accordion', group: 'Grouping',
    options: [
      { label: 'Accordion', value: 'accordion' },
      { label: 'Section', value: 'section' },
    ],
    showWhen: (state) => !!state.groupBy,
    description: 'How groups are displayed',
  },
  {
    name: 'groupsOpen', label: 'Groups Open', control: 'checkbox',
    defaultValue: false, group: 'Grouping',
    showWhen: (state) => !!state.groupBy,
    description: 'Whether groups start expanded',
  },
  {
    name: 'subtotals', label: 'Subtotals', control: 'checkbox',
    defaultValue: true, group: 'Grouping',
    showWhen: (state) => !!state.groupBy,
    description: 'Show subtotal aggregation per group',
  },
  {
    name: 'subtotalFmt', label: 'Subtotal Format', control: 'text',
    defaultValue: '', group: 'Grouping',
    showWhen: (state) => !!state.groupBy && !!state.subtotals,
    description: 'Table-level format string for subtotals (fallback for all columns)',
  },

  // ─── Totals ──────────────────────────────────────────────────────────
  {
    name: 'totalRow', label: 'Total Row', control: 'checkbox',
    defaultValue: true, group: 'Totals',
    description: 'Show a summary total row at the bottom',
  },

  // ─── Styling ─────────────────────────────────────────────────────────
  {
    name: 'compact', label: 'Compact', control: 'checkbox',
    defaultValue: false, group: 'Styling',
  },
  {
    name: 'rowShading', label: 'Row Shading', control: 'checkbox',
    defaultValue: false, group: 'Styling',
  },
  {
    name: 'rowLines', label: 'Row Lines', control: 'checkbox',
    defaultValue: true, group: 'Styling',
  },
  {
    name: 'wrapTitles', label: 'Wrap Titles', control: 'checkbox',
    defaultValue: false, group: 'Styling',
  },
  {
    name: 'formatColumnTitles', label: 'Format Titles', control: 'checkbox',
    defaultValue: true, group: 'Styling',
  },

  // ─── Colors ──────────────────────────────────────────────────────────
  {
    name: 'headerColor', label: 'Header Color', control: 'color',
    defaultValue: '#236aa4', group: 'Colors',
    description: 'Header background color',
  },
  {
    name: 'headerFontColor', label: 'Header Font Color', control: 'color',
    defaultValue: '#ffffff', group: 'Colors',
    description: 'Header text color',
  },
  {
    name: 'backgroundColor', label: 'Background Color', control: 'color',
    defaultValue: '', group: 'Colors',
  },
  {
    name: 'totalRowColor', label: 'Total Row Color', control: 'color',
    defaultValue: '', group: 'Colors',
    showWhen: (state) => !!state.totalRow,
  },
  {
    name: 'accordionRowColor', label: 'Accordion Row Color', control: 'color',
    defaultValue: '', group: 'Colors',
    showWhen: (state) => !!state.groupBy && state.groupType === 'accordion',
    description: 'Accordion group header background color',
  },
];
