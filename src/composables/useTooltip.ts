/**
 * Vue 3 composable for tooltip formatting
 *
 */

import type { TooltipComponentFormatterCallbackParams } from 'echarts';
import type { FormatObject, XAxisType } from '../types';
import { formatValue, formatTitle } from '../utils/formatting';

export interface TooltipOptions {
  /**
   * Whether X and Y axes are swapped
   */
  swapXY?: boolean;

  /**
   * X-axis type
   */
  xType?: XAxisType;

  /**
   * Total series count
   */
  totalSeriesCount?: number;

  /**
   * Y-axis series count
   */
  yCount?: number;

  /**
   * Y2-axis series count
   */
  y2Count?: number;

  /**
   * X column name
   */
  xColumn?: string;

  /**
   * Y column name(s)
   */
  yColumn?: string | string[];

  /**
   * X format
   */
  xFormat?: FormatObject;

  /**
   * Y format
   */
  yFormat?: FormatObject;

  /**
   * Y2 format
   */
  y2Format?: FormatObject;

  /**
   * Custom tooltip title column
   */
  tooltipTitle?: string;
}

export interface TooltipFormatterReturn {
  /**
   * Creates a tooltip formatter function for ECharts
   */
  createFormatter: (options: TooltipOptions) => (params: TooltipComponentFormatterCallbackParams) => string;

  /**
   * Default tooltip formatter
   */
  defaultFormatter: (params: TooltipComponentFormatterCallbackParams, options: TooltipOptions) => string;

  /**
   * Scatter/Bubble chart tooltip formatter
   */
  scatterFormatter: (params: TooltipComponentFormatterCallbackParams, options: TooltipOptions & {
    size?: string;
    sizeFormat?: FormatObject;
  }) => string;
}

/**
 * Gets the Y-axis index for a given component index
 */
function getYAxisIndex(componentIndex: number, yCount: number, y2Count: number): number {
  // If we have y2 series, they come after the y series
  if (y2Count > 0 && componentIndex >= yCount) {
    return 1;
  }
  return 0;
}

/**
 * Main composable for tooltip formatting
 */
export function useTooltip(): TooltipFormatterReturn {
  /**
   * Default tooltip formatter (for line, bar, area charts)
   */
  const defaultFormatter = (
    params: TooltipComponentFormatterCallbackParams,
    options: TooltipOptions
  ): string => {
    const {
      swapXY = false,
      xType = 'category',
      totalSeriesCount = 1,
      yCount = 1,
      y2Count = 0,
      xColumn = 'x',
      xFormat,
      yFormat,
      y2Format
    } = options;

    // Handle array of params
    const paramsArray = Array.isArray(params) ? params : [params];
    if (paramsArray.length === 0) return '';

    let output = '';
    const firstValue = paramsArray[0].value as unknown[] | undefined;
    const xVal = firstValue?.[swapXY ? 1 : 0];

    if (totalSeriesCount > 1) {
      // Multi-series: add x value as title
      output = `<span id="tooltip" style='font-weight: 600;'>${formatValue(xVal, xFormat)}</span>`;

      // Add each series value (in reverse order for proper stacking display)
      for (let i = paramsArray.length - 1; i >= 0; i--) {
        const param = paramsArray[i];
        if (param.seriesName !== 'stackTotal') {
          const paramValue = param.value as unknown[] | undefined;
          const yVal = paramValue?.[swapXY ? 0 : 1];
          const yAxisIndex = getYAxisIndex(param.componentIndex || 0, yCount, y2Count);
          const format = yAxisIndex === 0 ? yFormat : y2Format;

          output += `<br> <span style='font-size: 11px;'>${param.marker} ${param.seriesName}</span>`;
          output += `<span style='float:right; margin-left: 10px; font-size: 12px;'>${formatValue(yVal, format)}</span>`;
        }
      }
    } else if (xType === 'value') {
      // Single-series with numerical x-axis
      const valueArr = paramsArray[0].value as unknown[] | undefined;
      const xValLocal = valueArr?.[swapXY ? 1 : 0];
      const yVal = valueArr?.[swapXY ? 0 : 1];
      const yCol = paramsArray[0].seriesName || '';

      output = `<span id="tooltip" style='font-weight: 600;'>${formatTitle(xColumn, xFormat)}: </span>`;
      output += `<span style='float:right; margin-left: 10px;'>${formatValue(xValLocal, xFormat)}</span><br/>`;
      output += `<span style='font-weight: 600;'>${formatTitle(yCol, yFormat)}: </span>`;
      output += `<span style='float:right; margin-left: 10px;'>${formatValue(yVal, yFormat)}</span>`;
    } else {
      // Single series with categorical or date x-axis
      const valueArr = paramsArray[0].value as unknown[] | undefined;
      const xValLocal = valueArr?.[swapXY ? 1 : 0];
      const yVal = valueArr?.[swapXY ? 0 : 1];
      const yCol = paramsArray[0].seriesName || '';

      output = `<span id="tooltip" style='font-weight: 600;'>${formatValue(xValLocal, xFormat)}</span><br/>`;
      output += `<span>${formatTitle(yCol, yFormat)}: </span>`;
      output += `<span style='float:right; margin-left: 10px;'>${formatValue(yVal, yFormat)}</span>`;
    }

    return output;
  };

  /**
   * Scatter/Bubble chart tooltip formatter
   */
  const scatterFormatter = (
    params: TooltipComponentFormatterCallbackParams,
    options: TooltipOptions & {
      size?: string;
      sizeFormat?: FormatObject;
    }
  ): string => {
    const {
      xColumn = 'x',
      yColumn,
      xFormat,
      yFormat,
      size,
      sizeFormat,
      tooltipTitle
    } = options;

    // Handle array or single param
    const param = Array.isArray(params) ? params[0] : params;
    if (!param || !param.value) return '';

    const data = param.value as (number | string)[];
    const xVal = data[0];
    const yVal = data[1];
    const sizeVal = size ? data[2] : undefined;
    const labelVal = tooltipTitle ? data[size ? 3 : 2] : undefined;

    let output = '';

    // Title (label or series name)
    if (labelVal !== undefined) {
      output += `<span id="tooltip" style='font-weight: 600;'>${labelVal}</span><br/>`;
    } else if (param.seriesName) {
      output += `<span id="tooltip" style='font-weight: 600;'>${param.seriesName}</span><br/>`;
    }

    // X value
    output += `<span>${formatTitle(xColumn, xFormat)}: </span>`;
    output += `<span style='float:right; margin-left: 10px;'>${formatValue(xVal, xFormat)}</span><br/>`;

    // Y value
    const yColName = typeof yColumn === 'string' ? yColumn : (yColumn?.[0] || 'y');
    output += `<span>${formatTitle(yColName, yFormat)}: </span>`;
    output += `<span style='float:right; margin-left: 10px;'>${formatValue(yVal, yFormat)}</span>`;

    // Size value (for bubble charts)
    if (size && sizeVal !== undefined) {
      output += `<br/><span>${formatTitle(size, sizeFormat)}: </span>`;
      output += `<span style='float:right; margin-left: 10px;'>${formatValue(sizeVal, sizeFormat)}</span>`;
    }

    return output;
  };

  /**
   * Creates a tooltip formatter function
   */
  const createFormatter = (
    options: TooltipOptions
  ): ((params: TooltipComponentFormatterCallbackParams) => string) => {
    return (params: TooltipComponentFormatterCallbackParams) => {
      return defaultFormatter(params, options);
    };
  };

  return {
    createFormatter,
    defaultFormatter,
    scatterFormatter
  };
}

/**
 * Creates default tooltip configuration
 */
export function createTooltipConfig(options: TooltipOptions = {}): object {
  const { createFormatter } = useTooltip();

  return {
    trigger: 'axis',
    show: true,
    formatter: createFormatter(options),
    confine: true,
    axisPointer: {
      type: 'shadow'
    },
    extraCssText:
      'box-shadow: 0 3px 6px rgba(0,0,0,.15); box-shadow: 0 2px 4px rgba(0,0,0,.12); z-index: 1; font-feature-settings: "cv02", "tnum";',
    order: 'valueDesc'
  };
}
