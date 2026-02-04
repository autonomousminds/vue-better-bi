import { Ref, ComputedRef } from 'vue';
import { Appearance, AppearancePreference, Theme, ColorPaletteInput, ColorScaleInput } from '../types';
import { configureThemes } from '../themes/echartsThemes';
import { ThemeStoresContext } from '../symbols/injectionKeys';

export interface UseThemeOptions {
    /**
     * Default appearance preference
     */
    defaultAppearance?: AppearancePreference;
    /**
     * Whether to sync with system preference
     */
    syncWithSystem?: boolean;
    /**
     * Local storage key for persisting preference
     */
    storageKey?: string;
}
export interface UseThemeReturn {
    /**
     * The current system theme preference
     */
    systemTheme: Ref<Appearance>;
    /**
     * The user's selected appearance preference
     */
    selectedAppearance: Ref<AppearancePreference>;
    /**
     * The actual active appearance (resolves 'system' to actual value)
     */
    activeAppearance: ComputedRef<Appearance>;
    /**
     * The current theme object
     */
    theme: ComputedRef<Theme>;
    /**
     * Set the appearance preference
     */
    setAppearance: (appearance: AppearancePreference) => void;
    /**
     * Cycle through appearance options (system -> light -> dark -> system)
     */
    cycleAppearance: () => void;
    /**
     * Resolve a color input to an actual color
     */
    resolveColor: <T>(input: T) => ComputedRef<string | T | undefined>;
    /**
     * Resolve an object of colors
     */
    resolveColorsObject: <T>(input: Record<string, T> | undefined) => ComputedRef<Record<string, string | T | undefined> | undefined>;
    /**
     * Resolve a color palette
     */
    resolveColorPalette: (input: ColorPaletteInput) => ComputedRef<string[] | undefined>;
    /**
     * Resolve a color scale
     */
    resolveColorScale: (input: ColorScaleInput) => ComputedRef<string[] | undefined>;
    /**
     * Configure custom themes
     */
    configureThemes: typeof configureThemes;
}
/**
 * Main composable for theme management
 */
export declare function useTheme(options?: UseThemeOptions): UseThemeReturn;
/**
 * Provides theme context to child components
 */
export declare function provideTheme(themeReturn: UseThemeReturn): void;
/**
 * Injects theme context from parent components
 */
export declare function injectTheme(): ThemeStoresContext | undefined;
/**
 * Gets theme stores, creating if not already provided
 */
export declare function useThemeStores(options?: UseThemeOptions): ThemeStoresContext;
