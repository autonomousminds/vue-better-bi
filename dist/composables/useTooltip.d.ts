import { TooltipComponentFormatterCallbackParams } from 'echarts';
import { FormatObject, XAxisType } from '../types';

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
 * Main composable for tooltip formatting
 */
export declare function useTooltip(): TooltipFormatterReturn;
/**
 * Creates default tooltip configuration
 */
export declare function createTooltipConfig(options?: TooltipOptions): object;
