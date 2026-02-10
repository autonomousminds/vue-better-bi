import type { PropDefinition } from '../../types/playground.types';

export const dataTableProps: PropDefinition[] = [
  // ─── Core ────────────────────────────────────────────────────────────
  {
    name: 'rows', label: 'Rows Per Page', control: 'number',
    defaultValue: 10, group: 'Core', min: 1, max: 100, step: 1,
    description: 'Number of rows to display per page (set to 0 or use rows="all" to show all)',
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
    description: 'Show row index numbers',
  },
  {
    name: 'search', label: 'Search', control: 'checkbox',
    defaultValue: false, group: 'Core',
    description: 'Enable client-side search bar',
  },
  {
    name: 'sortable', label: 'Sortable', control: 'checkbox',
    defaultValue: true, group: 'Core',
    description: 'Allow clicking column headers to sort',
  },
  {
    name: 'downloadable', label: 'Downloadable', control: 'checkbox',
    defaultValue: true, group: 'Core',
    description: 'Show CSV download button',
  },
  {
    name: 'sort', label: 'Default Sort', control: 'text',
    defaultValue: '', group: 'Core',
    description: 'Default sort: "column_name" or "column_name desc"',
  },

  {
    name: 'emptySet', label: 'Empty Set Behavior', control: 'select',
    defaultValue: 'error', group: 'Core',
    options: [
      { label: 'Error', value: 'error' },
      { label: 'Warn', value: 'warn' },
      { label: 'Pass', value: 'pass' },
    ],
    description: 'How to handle empty data: error, warn, or pass (render nothing)',
  },
  {
    name: 'emptyMessage', label: 'Empty Message', control: 'text',
    defaultValue: 'No records', group: 'Core',
    description: 'Custom message shown when data is empty',
  },

  // ─── Grouping ────────────────────────────────────────────────────────
  {
    name: 'groupBy', label: 'Group By', control: 'select',
    defaultValue: '', group: 'Grouping',
    options: [
      { label: 'None', value: '' },
      { label: 'Department', value: 'department' },
      { label: 'Region', value: 'region' },
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
    defaultValue: true, group: 'Grouping',
    showWhen: (state) => !!state.groupBy,
    description: 'Whether groups start expanded',
  },
  {
    name: 'subtotals', label: 'Subtotals', control: 'checkbox',
    defaultValue: false, group: 'Grouping',
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
    defaultValue: false, group: 'Totals',
    description: 'Show a summary total row at the bottom',
  },

  // ─── Styling ─────────────────────────────────────────────────────────
  {
    name: 'compact', label: 'Compact', control: 'checkbox',
    defaultValue: false, group: 'Styling',
    description: 'Reduce padding and font size',
  },
  {
    name: 'rowShading', label: 'Row Shading', control: 'checkbox',
    defaultValue: false, group: 'Styling',
    description: 'Alternate row background shading',
  },
  {
    name: 'rowLines', label: 'Row Lines', control: 'checkbox',
    defaultValue: true, group: 'Styling',
    description: 'Show border lines between rows',
  },
  {
    name: 'wrapTitles', label: 'Wrap Titles', control: 'checkbox',
    defaultValue: false, group: 'Styling',
    description: 'Allow column titles to wrap',
  },
  {
    name: 'formatColumnTitles', label: 'Format Titles', control: 'checkbox',
    defaultValue: true, group: 'Styling',
    description: 'Auto-format column titles from snake_case',
  },

  // ─── Colors ──────────────────────────────────────────────────────────
  {
    name: 'headerColor', label: 'Header Color', control: 'color',
    defaultValue: '', group: 'Colors',
    description: 'Header background color',
  },
  {
    name: 'headerFontColor', label: 'Header Font Color', control: 'color',
    defaultValue: '', group: 'Colors',
    description: 'Header text color',
  },
  {
    name: 'backgroundColor', label: 'Background Color', control: 'color',
    defaultValue: '', group: 'Colors',
    description: 'Table background color',
  },
  {
    name: 'totalRowColor', label: 'Total Row Color', control: 'color',
    defaultValue: '', group: 'Colors',
    showWhen: (state) => !!state.totalRow,
    description: 'Total row background color',
  },
  {
    name: 'accordionRowColor', label: 'Accordion Row Color', control: 'color',
    defaultValue: '', group: 'Colors',
    showWhen: (state) => !!state.groupBy && state.groupType === 'accordion',
    description: 'Accordion group header background color',
  },
];
