import { Ref } from 'vue';
import { EChartsOption } from 'echarts';
import { DataRecord, Appearance } from '../types';

export interface ExportImageOptions {
    /**
     * Image format
     */
    type?: 'png' | 'jpeg';
    /**
     * Pixel ratio for higher resolution
     */
    pixelRatio?: number;
    /**
     * Background color
     */
    backgroundColor?: string;
    /**
     * Width of exported image
     */
    width?: number;
    /**
     * Filename (without extension)
     */
    filename?: string;
    /**
     * Components to exclude from export
     */
    excludeComponents?: string[];
}
export interface ExportCsvOptions {
    /**
     * Filename (without extension)
     */
    filename?: string;
    /**
     * Include header row
     */
    showHeaders?: boolean;
    /**
     * Use BOM for UTF-8 encoding (helps Excel recognize UTF-8)
     */
    useBom?: boolean;
    /**
     * Column separator
     */
    separator?: string;
}
export interface UseExportReturn {
    /**
     * Whether export is in progress
     */
    isExporting: Ref<boolean>;
    /**
     * Export chart as PNG image
     */
    exportAsPng: (chartConfig: EChartsOption, options?: ExportImageOptions, theme?: Appearance, seriesColors?: Record<string, string>, echartsOptions?: EChartsOption, seriesOptions?: Record<string, unknown>) => Promise<void>;
    /**
     * Export chart as JPEG image
     */
    exportAsJpeg: (chartConfig: EChartsOption, options?: ExportImageOptions, theme?: Appearance, seriesColors?: Record<string, string>, echartsOptions?: EChartsOption, seriesOptions?: Record<string, unknown>) => Promise<void>;
    /**
     * Export data as CSV
     */
    exportAsCsv: (data: DataRecord[], options?: ExportCsvOptions) => void;
    /**
     * Copy chart to clipboard as image
     */
    copyToClipboard: (chartConfig: EChartsOption, theme?: Appearance, seriesColors?: Record<string, string>, echartsOptions?: EChartsOption, seriesOptions?: Record<string, unknown>) => Promise<boolean>;
    /**
     * Get data URL from chart config
     */
    getChartDataUrl: (chartConfig: EChartsOption, options?: ExportImageOptions, theme?: Appearance, seriesColors?: Record<string, string>, echartsOptions?: EChartsOption, seriesOptions?: Record<string, unknown>) => string | null;
}
/**
 * Main composable for export functionality
 */
export declare function useExport(): UseExportReturn;
