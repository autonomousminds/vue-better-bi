import type { PropDefinition } from '../../types/playground.types';

export const formatOptions = [
  { label: 'None', value: '' },
  { label: '--- Currencies ---', value: '_divider_cur' },
  { label: 'USD ($1,234)', value: 'usd' },
  { label: 'USD no dec ($1,234)', value: 'usd0' },
  { label: 'USD 1 dec ($1,234.5)', value: 'usd1' },
  { label: 'USD 2 dec ($1,234.56)', value: 'usd2' },
  { label: 'USD thousands ($1.2k)', value: 'usd0k' },
  { label: 'USD millions ($1.2M)', value: 'usd0m' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
  { label: 'JPY', value: 'jpy' },
  { label: 'CAD', value: 'cad' },
  { label: '--- Numbers ---', value: '_divider_num' },
  { label: 'Number 0 dec', value: 'num0' },
  { label: 'Number 1 dec', value: 'num1' },
  { label: 'Number 2 dec', value: 'num2' },
  { label: 'Number 3 dec', value: 'num3' },
  { label: 'Thousands (1.2k)', value: 'num0k' },
  { label: 'Millions (1.2M)', value: 'num0m' },
  { label: '--- Percentages ---', value: '_divider_pct' },
  { label: 'Percent (50%)', value: 'pct' },
  { label: 'Percent 0 dec', value: 'pct0' },
  { label: 'Percent 1 dec', value: 'pct1' },
  { label: 'Percent 2 dec', value: 'pct2' },
  { label: '--- Dates ---', value: '_divider_date' },
  { label: 'Short date', value: 'shortdate' },
  { label: 'Long date', value: 'longdate' },
  { label: 'Full date', value: 'fulldate' },
  { label: 'M/D/Y', value: 'mdy' },
  { label: 'D/M/Y', value: 'dmy' },
  { label: 'H:M:S', value: 'hms' },
  { label: 'Month (Jan)', value: 'mmm' },
  { label: 'Month (January)', value: 'mmmm' },
  { label: 'Year', value: 'yyyy' },
];

export const colorPaletteOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Categorical', value: 'categorical' },
  { label: 'Pastel', value: 'pastel' },
  { label: 'Vivid', value: 'vivid' },
  { label: 'Cool', value: 'cool' },
  { label: 'Warm', value: 'warm' },
];

export const colorScaleOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Grey', value: 'grey' },
  { label: 'Blue-Green', value: 'blueGreen' },
  { label: 'Yellow-Green', value: 'yellowGreen' },
  { label: 'Yellow-Orange-Red', value: 'yellowOrangeRed' },
  { label: 'Diverging', value: 'diverging' },
];

const easingOptions = [
  { label: 'linear', value: 'linear' },
  { label: 'cubicIn', value: 'cubicIn' },
  { label: 'cubicOut', value: 'cubicOut' },
  { label: 'cubicInOut', value: 'cubicInOut' },
  { label: 'elasticOut', value: 'elasticOut' },
  { label: 'bounceOut', value: 'bounceOut' },
  { label: 'backOut', value: 'backOut' },
  { label: 'exponentialOut', value: 'exponentialOut' },
];

export const titleProps: PropDefinition[] = [
  { name: 'title', label: 'Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'subtitle', label: 'Subtitle', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'xAxisTitle', label: 'X Axis Title', control: 'text', defaultValue: '', group: 'Titles' },
  { name: 'yAxisTitle', label: 'Y Axis Title', control: 'text', defaultValue: '', group: 'Titles' },
];

export const xAxisProps: PropDefinition[] = [
  { name: 'xAxisLabels', label: 'X Axis Labels', control: 'checkbox', defaultValue: true, group: 'X-Axis' },
  { name: 'xBaseline', label: 'X Baseline', control: 'checkbox', defaultValue: true, group: 'X-Axis' },
  { name: 'xGridlines', label: 'X Gridlines', control: 'checkbox', defaultValue: false, group: 'X-Axis' },
  { name: 'xTickMarks', label: 'X Tick Marks', control: 'checkbox', defaultValue: false, group: 'X-Axis' },
  { name: 'showAllXAxisLabels', label: 'Show All X Labels', control: 'checkbox', defaultValue: false, group: 'X-Axis' },
  { name: 'xLabelWrap', label: 'Wrap X Labels', control: 'checkbox', defaultValue: false, group: 'X-Axis' },
];

export const yAxisProps: PropDefinition[] = [
  { name: 'yAxisLabels', label: 'Y Axis Labels', control: 'checkbox', defaultValue: true, group: 'Y-Axis' },
  { name: 'yBaseline', label: 'Y Baseline', control: 'checkbox', defaultValue: true, group: 'Y-Axis' },
  { name: 'yGridlines', label: 'Y Gridlines', control: 'checkbox', defaultValue: true, group: 'Y-Axis' },
  { name: 'yTickMarks', label: 'Y Tick Marks', control: 'checkbox', defaultValue: false, group: 'Y-Axis' },
  { name: 'yLog', label: 'Log Scale', control: 'checkbox', defaultValue: false, group: 'Y-Axis' },
  { name: 'yAxisColor', label: 'Y Axis Color', control: 'color', defaultValue: '', group: 'Y-Axis', showWhen: (s) => !!s.y2 },
];

export const y2AxisProps: PropDefinition[] = [
  { name: 'y2Fmt', label: 'Y2 Format', control: 'select', defaultValue: '', group: 'Secondary Y-Axis', options: formatOptions, showWhen: (s) => !!s.y2 },
  { name: 'y2AxisTitle', label: 'Y2 Axis Title', control: 'text', defaultValue: '', group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  { name: 'y2AxisLabels', label: 'Y2 Axis Labels', control: 'checkbox', defaultValue: true, group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  { name: 'y2Gridlines', label: 'Y2 Gridlines', control: 'checkbox', defaultValue: false, group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  { name: 'y2Baseline', label: 'Y2 Baseline', control: 'checkbox', defaultValue: false, group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  { name: 'y2TickMarks', label: 'Y2 Tick Marks', control: 'checkbox', defaultValue: false, group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
  { name: 'y2AxisColor', label: 'Y2 Axis Color', control: 'color', defaultValue: '', group: 'Secondary Y-Axis', showWhen: (s) => !!s.y2 },
];

export const displayProps: PropDefinition[] = [
  { name: 'legend', label: 'Legend', control: 'checkbox', defaultValue: true, group: 'Display' },
  {
    name: 'legendPosition', label: 'Legend Position', control: 'select', defaultValue: 'top', group: 'Display',
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
  },
  { name: 'height', label: 'Height', control: 'text', defaultValue: '400px', group: 'Display' },
  { name: 'swapXY', label: 'Swap X/Y (Horizontal)', control: 'checkbox', defaultValue: false, group: 'Display' },
  { name: 'sort', label: 'Sort', control: 'checkbox', defaultValue: false, group: 'Display' },
  { name: 'backgroundColor', label: 'Background Color', control: 'color', defaultValue: '', group: 'Display' },
];

export const formatProps: PropDefinition[] = [
  { name: 'xFmt', label: 'X Format', control: 'select', defaultValue: '', group: 'Formatting', options: formatOptions },
  { name: 'yFmt', label: 'Y Format', control: 'select', defaultValue: '', group: 'Formatting', options: formatOptions },
];

export const zoomProps: PropDefinition[] = [
  {
    name: 'zoom', label: 'Zoom', control: 'checkbox', defaultValue: false, group: 'Zoom',
    subProps: [
      {
        name: 'type', label: 'Type', control: 'select', defaultValue: 'slider', group: 'Zoom',
        options: [
          { label: 'Slider', value: 'slider' },
          { label: 'Inside (scroll)', value: 'inside' },
          { label: 'Both', value: 'both' },
        ]
      },
      {
        name: 'axis', label: 'Axis', control: 'select', defaultValue: 'x', group: 'Zoom',
        options: [
          { label: 'X', value: 'x' },
          { label: 'Y', value: 'y' },
          { label: 'Both', value: 'both' },
        ]
      },
      { name: 'start', label: 'Start %', control: 'number', defaultValue: 0, group: 'Zoom', min: 0, max: 100 },
      { name: 'end', label: 'End %', control: 'number', defaultValue: 100, group: 'Zoom', min: 0, max: 100 },
    ]
  },
];

export const toolboxProps: PropDefinition[] = [
  {
    name: 'toolbox', label: 'Toolbox', control: 'checkbox', defaultValue: false, group: 'Toolbox',
    subProps: [
      {
        name: 'position', label: 'Position', control: 'select', defaultValue: 'top-right', group: 'Toolbox',
        options: [
          { label: 'Top Right', value: 'top-right' },
          { label: 'Top Left', value: 'top-left' },
          { label: 'Bottom Right', value: 'bottom-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
        ]
      },
      { name: 'saveAsImage', label: 'Save As Image', control: 'checkbox', defaultValue: true, group: 'Toolbox' },
      { name: 'dataZoom', label: 'Data Zoom', control: 'checkbox', defaultValue: true, group: 'Toolbox' },
      { name: 'restore', label: 'Restore', control: 'checkbox', defaultValue: true, group: 'Toolbox' },
    ]
  },
];

export const animationProps: PropDefinition[] = [
  {
    name: 'animation', label: 'Animation', control: 'checkbox', defaultValue: true, group: 'Animation',
    subProps: [
      { name: 'duration', label: 'Duration (ms)', control: 'number', defaultValue: 1000, group: 'Animation', min: 0, max: 5000, step: 100 },
      {
        name: 'easing', label: 'Easing', control: 'select', defaultValue: 'cubicOut', group: 'Animation',
        options: easingOptions
      },
    ]
  },
];

export const tooltipProps: PropDefinition[] = [
  {
    name: 'tooltip', label: 'Tooltip', control: 'checkbox', defaultValue: true, group: 'Tooltip',
    subProps: [
      {
        name: 'trigger', label: 'Trigger', control: 'select', defaultValue: 'axis', group: 'Tooltip',
        options: [
          { label: 'Axis', value: 'axis' },
          { label: 'Item', value: 'item' },
          { label: 'None', value: 'none' },
        ]
      },
      {
        name: 'axisPointer', label: 'Axis Pointer', control: 'select', defaultValue: 'shadow', group: 'Tooltip',
        options: [
          { label: 'Shadow', value: 'shadow' },
          { label: 'Line', value: 'line' },
          { label: 'Cross', value: 'cross' },
          { label: 'None', value: 'none' },
        ]
      },
    ]
  },
];

export const exportProps: PropDefinition[] = [
  { name: 'downloadableData', label: 'Downloadable Data', control: 'checkbox', defaultValue: true, group: 'Export' },
  { name: 'downloadableImage', label: 'Downloadable Image', control: 'checkbox', defaultValue: true, group: 'Export' },
  {
    name: 'renderer', label: 'Renderer', control: 'select', defaultValue: 'canvas', group: 'Export',
    options: [
      { label: 'Canvas', value: 'canvas' },
      { label: 'SVG', value: 'svg' },
    ]
  },
];

export const baseChartPropDefs: PropDefinition[] = [
  ...titleProps,
  ...formatProps,
  ...xAxisProps,
  ...yAxisProps,
  ...displayProps,
  ...zoomProps,
  ...toolboxProps,
  ...animationProps,
  ...tooltipProps,
  ...exportProps,
];
