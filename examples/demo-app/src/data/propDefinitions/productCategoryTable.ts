import type { PropDefinition } from '../../types/playground.types';

export const productCategoryTableProps: PropDefinition[] = [
  // ─── Core ────────────────────────────────────────────────────────────
  {
    name: 'rows', label: 'Rows Per Page', control: 'number',
    defaultValue: 10, group: 'Core', min: 1, max: 100, step: 1,
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
];
