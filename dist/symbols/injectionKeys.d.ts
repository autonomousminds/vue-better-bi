import { InjectionKey, Ref } from 'vue';
import { EChartsOption } from 'echarts';
import { Appearance, Theme, ChartContext } from '../types';

/**
 * Key for providing chart props to child components
 */
export declare const chartPropsKey: InjectionKey<Ref<ChartContext>>;
/**
 * Key for providing chart config to child components
 */
export declare const chartConfigKey: InjectionKey<Ref<EChartsOption>>;
/**
 * Key for providing theme stores
 */
export interface ThemeStoresContext {
    activeAppearance: Ref<Appearance>;
    selectedAppearance: Ref<Appearance | 'system'>;
    theme: Ref<Theme>;
    setAppearance: (appearance: Appearance | 'system') => void;
    cycleAppearance: () => void;
    resolveColor: <T>(input: T) => Ref<string | T | undefined>;
    resolveColorsObject: <T>(input: Record<string, T> | undefined) => Ref<Record<string, string | T | undefined> | undefined>;
    resolveColorPalette: (input: string | string[]) => Ref<string[] | undefined>;
    resolveColorScale: (input: string | string[]) => Ref<string[] | undefined>;
}
export declare const themeStoresKey: InjectionKey<ThemeStoresContext>;
/**
 * Key for providing ECharts instance to child components
 */
export declare const echartsInstanceKey: InjectionKey<Ref<echarts.ECharts | null>>;
/**
 * Key for providing series configuration to child components
 */
export interface SeriesConfigContext {
    addSeries: (series: EChartsOption['series']) => void;
    removeSeries: (name: string) => void;
    updateSeries: (name: string, config: Partial<EChartsOption['series']>) => void;
}
export declare const seriesConfigKey: InjectionKey<SeriesConfigContext>;
