import { EChartsThemeConfig, Appearance, Theme } from '../types';

/**
 * Configures the themes with custom colors and palettes
 */
export declare function configureThemes(customThemes: {
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
}): void;
/**
 * Gets the current themes configuration
 */
export declare function getThemes(): {
    light: Theme;
    dark: Theme;
};
/**
 * Creates an ECharts theme object for the given appearance mode
 */
export declare function createEChartsTheme(mode: Appearance): EChartsThemeConfig;
export declare const defaultThemeLight: EChartsThemeConfig;
export declare const defaultThemeDark: EChartsThemeConfig;
