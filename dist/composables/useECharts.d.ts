import { Ref, ShallowRef } from 'vue';
import { EChartsOption, ECharts } from 'echarts';
import { Appearance, ChartRenderer } from '../types';

export interface UseEChartsOptions {
    /**
     * Theme mode
     */
    theme?: Ref<Appearance> | Appearance;
    /**
     * Renderer type
     */
    renderer?: ChartRenderer;
    /**
     * Connect group for linked interactions
     */
    connectGroup?: string;
    /**
     * Animation duration in ms
     */
    animationDuration?: number;
    /**
     * Whether to auto-resize on container changes
     */
    autoResize?: boolean;
    /**
     * Resize debounce delay in ms
     */
    resizeDebounce?: number;
}
export interface UseEChartsReturn {
    /**
     * Reference to the ECharts instance
     */
    chartInstance: ShallowRef<ECharts | null>;
    /**
     * Reference to the container element
     */
    containerRef: Ref<HTMLElement | null>;
    /**
     * Initialize the chart
     */
    init: (container?: HTMLElement) => ECharts | null;
    /**
     * Set chart options
     */
    setOption: (option: EChartsOption, notMerge?: boolean) => void;
    /**
     * Resize the chart
     */
    resize: () => void;
    /**
     * Dispose the chart
     */
    dispose: () => void;
    /**
     * Get data URL for export
     */
    getDataURL: (opts?: {
        type?: 'png' | 'jpeg' | 'svg';
        pixelRatio?: number;
        backgroundColor?: string;
        excludeComponents?: string[];
    }) => string | undefined;
    /**
     * Check if chart is disposed
     */
    isDisposed: () => boolean;
}
/**
 * Main composable for ECharts instance management
 */
export declare function useECharts(options?: UseEChartsOptions): UseEChartsReturn;
/**
 * Apply series colors override
 */
export declare function applySeriesColors(chart: ECharts, seriesColors: Record<string, string> | undefined): void;
/**
 * Apply additional ECharts options
 */
export declare function applyEchartsOptions(chart: ECharts, echartsOptions: EChartsOption | undefined): void;
/**
 * Apply series options to all series (except reference lines/areas/points)
 */
export declare function applySeriesOptions(chart: ECharts, seriesOptions: Record<string, unknown> | undefined, config: EChartsOption): void;
