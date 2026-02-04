/**
 * Theme types for the chart system
 */
export type Appearance = 'light' | 'dark';
export type AppearancePreference = 'light' | 'dark' | 'system';
export interface ThemeColors {
    'base-100': string;
    'base-200': string;
    'base-300': string;
    'base-content': string;
    'base-content-muted': string;
    'base-heading': string;
    [key: string]: string;
}
export interface ThemeColorPalettes {
    default: string[];
    [key: string]: string[];
}
export interface ThemeColorScales {
    [key: string]: string[];
}
export interface Theme {
    colors: ThemeColors;
    colorPalettes: ThemeColorPalettes;
    colorScales: ThemeColorScales;
}
export interface ThemesConfig {
    appearance: {
        default: AppearancePreference;
        switcher: boolean;
    };
}
export type ColorInput = string | [string] | [string, string];
export type ColorPaletteInput = string | string[];
export type ColorScaleInput = string | string[];
export interface EChartsThemeConfig {
    darkMode: boolean;
    backgroundColor: string;
    textStyle: {
        fontFamily: string[];
    };
    grid: {
        left: string;
        right: string;
        bottom: string;
        top: string;
        containLabel: boolean;
    };
    color: string[];
    title: {
        padding: number;
        itemGap: number;
        textStyle: {
            fontSize: number;
            color: string;
        };
        subtextStyle: {
            fontSize: number;
            color: string;
            overflow: string;
        };
        top: string;
    };
    line: object;
    radar: object;
    pie: object;
    scatter: object;
    boxplot: object;
    parallel: object;
    sankey: object;
    funnel: object;
    gauge: object;
    candlestick: object;
    graph: object;
    map: object;
    geo: object;
    categoryAxis: object;
    valueAxis: object;
    logAxis: object;
    timeAxis: object;
    toolbox: object;
    legend: object;
    tooltip: object;
    timeline: object;
    visualMap: object;
    dataZoom: object;
    markPoint: object;
}
