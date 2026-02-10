/**
 * Vue provide/inject symbols for the charting system
 */

import type { InjectionKey, Ref } from 'vue';
import type { EChartsOption } from 'echarts';
import type { Appearance, Theme, ChartContext } from '../types';

/**
 * Key for providing chart props to child components
 */
export const chartPropsKey: InjectionKey<Ref<ChartContext>> = Symbol('chartProps');

/**
 * Key for providing chart config to child components
 */
export const chartConfigKey: InjectionKey<Ref<EChartsOption>> = Symbol('chartConfig');

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

export const themeStoresKey: InjectionKey<ThemeStoresContext> = Symbol('themeStores');

/**
 * Key for providing ECharts instance to child components
 */
export const echartsInstanceKey: InjectionKey<Ref<echarts.ECharts | null>> = Symbol('echartsInstance');

/**
 * Key for providing series configuration to child components
 */
export interface SeriesConfigContext {
  addSeries: (series: EChartsOption['series']) => void;
  removeSeries: (name: string) => void;
  updateSeries: (name: string, config: Partial<EChartsOption['series']>) => void;
}

export const seriesConfigKey: InjectionKey<SeriesConfigContext> = Symbol('seriesConfig');

/**
 * Key for providing table context to Column child components
 */
export interface TableContext {
  registerColumn: (config: import('../types/table.types').TableColumnConfig) => void;
  unregisterColumn: (id: string) => void;
  updateColumn: (config: import('../types/table.types').TableColumnConfig) => void;
  data: Record<string, unknown>[];
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('tableContext');
