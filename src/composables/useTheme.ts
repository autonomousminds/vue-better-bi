/**
 * Vue 3 composable for theme management
 */

import { ref, computed, provide, inject, type Ref, type ComputedRef } from 'vue';
import type { Appearance, Theme, ColorPaletteInput, ColorScaleInput } from '../types';
import { getTheme, configureThemes, themeVersion } from '../themes/echartsThemes';
import {
  resolveColor as resolveColorFn,
  resolveColorsObject as resolveColorsObjectFn,
  resolveColorPalette as resolveColorPaletteFn,
  resolveColorScale as resolveColorScaleFn
} from '../themes/colorPalettes';
import { themeStoresKey, type ThemeStoresContext } from '../symbols/injectionKeys';

export interface UseThemeReturn {
  /**
   * The active appearance (always 'light')
   */
  activeAppearance: Ref<Appearance>;

  /**
   * The current theme object
   */
  theme: ComputedRef<Theme>;

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
export function useTheme(): UseThemeReturn {
  const activeAppearance = ref<Appearance>('light');

  // Current theme object (reactive to theme configuration changes)
  const theme = computed<Theme>(() => {
    void themeVersion.value; // track theme reconfiguration
    return getTheme();
  });

  // Color resolution functions that return computed refs
  const resolveColor = <T>(input: T): ComputedRef<string | T | undefined> => {
    return computed(() => {
      void themeVersion.value;
      return resolveColorFn(input);
    });
  };

  const resolveColorsObject = <T>(
    input: Record<string, T> | undefined
  ): ComputedRef<Record<string, string | T | undefined> | undefined> => {
    return computed(() => {
      void themeVersion.value;
      return resolveColorsObjectFn(input);
    });
  };

  const resolveColorPalette = (input: ColorPaletteInput): ComputedRef<string[] | undefined> => {
    return computed(() => resolveColorPaletteFn(input, theme.value));
  };

  const resolveColorScale = (input: ColorScaleInput): ComputedRef<string[] | undefined> => {
    return computed(() => resolveColorScaleFn(input, theme.value));
  };

  return {
    activeAppearance,
    theme,
    resolveColor,
    resolveColorsObject,
    resolveColorPalette,
    resolveColorScale,
    configureThemes
  };
}

/**
 * Provides theme context to child components
 */
export function provideTheme(themeReturn: UseThemeReturn): void {
  const context: ThemeStoresContext = {
    activeAppearance: themeReturn.activeAppearance,
    theme: themeReturn.theme as unknown as Ref<Theme>,
    resolveColor: themeReturn.resolveColor as <T>(input: T) => Ref<string | T | undefined>,
    resolveColorsObject: themeReturn.resolveColorsObject as <T>(input: Record<string, T> | undefined) => Ref<Record<string, string | T | undefined> | undefined>,
    resolveColorPalette: themeReturn.resolveColorPalette as (input: string | string[]) => Ref<string[] | undefined>,
    resolveColorScale: themeReturn.resolveColorScale as (input: string | string[]) => Ref<string[] | undefined>
  };
  provide(themeStoresKey, context);
}

/**
 * Injects theme context from parent components
 */
export function injectTheme(): ThemeStoresContext | undefined {
  return inject(themeStoresKey);
}

/**
 * Gets theme stores, creating if not already provided
 */
export function useThemeStores(): ThemeStoresContext {
  const injected = inject(themeStoresKey, undefined);
  if (injected) {
    return injected;
  }

  // Create new theme stores if not provided
  const themeReturn = useTheme();
  return {
    activeAppearance: themeReturn.activeAppearance,
    theme: themeReturn.theme as unknown as Ref<Theme>,
    resolveColor: themeReturn.resolveColor as <T>(input: T) => Ref<string | T | undefined>,
    resolveColorsObject: themeReturn.resolveColorsObject as <T>(input: Record<string, T> | undefined) => Ref<Record<string, string | T | undefined> | undefined>,
    resolveColorPalette: themeReturn.resolveColorPalette as (input: string | string[]) => Ref<string[] | undefined>,
    resolveColorScale: themeReturn.resolveColorScale as (input: string | string[]) => Ref<string[] | undefined>
  };
}
