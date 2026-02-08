/**
 * Vue 3 composable for theme management
 */

import { ref, computed, watch, onMounted, onUnmounted, provide, inject, type Ref, type ComputedRef } from 'vue';
import type { Appearance, AppearancePreference, Theme, ColorPaletteInput, ColorScaleInput } from '../types';
import { getThemes, configureThemes, themeVersion } from '../themes/echartsThemes';
import {
  resolveColor as resolveColorFn,
  resolveColorsObject as resolveColorsObjectFn,
  resolveColorPalette as resolveColorPaletteFn,
  resolveColorScale as resolveColorScaleFn
} from '../themes/colorPalettes';
import { themeStoresKey, type ThemeStoresContext } from '../symbols/injectionKeys';

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
 * Detects the system's color scheme preference
 */
function getSystemTheme(): Appearance {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Main composable for theme management
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    defaultAppearance = 'system',
    syncWithSystem = true,
    storageKey = 'vue-echarts-theme'
  } = options;

  // System theme detection
  const systemTheme = ref<Appearance>(getSystemTheme());

  // User's selected preference
  const selectedAppearance = ref<AppearancePreference>(defaultAppearance);

  // Load from storage on mount
  onMounted(() => {
    if (typeof window !== 'undefined' && storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['system', 'light', 'dark'].includes(stored)) {
        selectedAppearance.value = stored as AppearancePreference;
      }
    }

    // Listen for system theme changes
    if (syncWithSystem && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        systemTheme.value = e.matches ? 'dark' : 'light';
      };
      mediaQuery.addEventListener('change', handler);
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handler);
      });
    }
  });

  // Persist selection to storage
  watch(selectedAppearance, (newValue) => {
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(storageKey, newValue);
    }
  });

  // Active appearance (resolved)
  const activeAppearance = computed<Appearance>(() => {
    return selectedAppearance.value === 'system'
      ? systemTheme.value
      : selectedAppearance.value;
  });

  // Current theme object (reactive to both appearance and theme configuration changes)
  const theme = computed<Theme>(() => {
    void themeVersion.value; // track theme reconfiguration
    const themes = getThemes();
    return themes[activeAppearance.value];
  });

  // Set appearance
  const setAppearance = (appearance: AppearancePreference): void => {
    selectedAppearance.value = appearance;
  };

  // Cycle appearance
  const cycleAppearance = (): void => {
    const cycle: AppearancePreference[] = ['system', 'light', 'dark'];
    const currentIndex = cycle.indexOf(selectedAppearance.value);
    selectedAppearance.value = cycle[(currentIndex + 1) % cycle.length];
  };

  // Color resolution functions that return computed refs
  const resolveColor = <T>(input: T): ComputedRef<string | T | undefined> => {
    return computed(() => resolveColorFn(input, activeAppearance.value));
  };

  const resolveColorsObject = <T>(
    input: Record<string, T> | undefined
  ): ComputedRef<Record<string, string | T | undefined> | undefined> => {
    return computed(() => resolveColorsObjectFn(input, activeAppearance.value));
  };

  const resolveColorPalette = (input: ColorPaletteInput): ComputedRef<string[] | undefined> => {
    return computed(() => resolveColorPaletteFn(input, theme.value));
  };

  const resolveColorScale = (input: ColorScaleInput): ComputedRef<string[] | undefined> => {
    return computed(() => resolveColorScaleFn(input, theme.value));
  };

  return {
    systemTheme,
    selectedAppearance,
    activeAppearance,
    theme,
    setAppearance,
    cycleAppearance,
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
    activeAppearance: themeReturn.activeAppearance as unknown as Ref<Appearance>,
    selectedAppearance: themeReturn.selectedAppearance,
    theme: themeReturn.theme as unknown as Ref<Theme>,
    setAppearance: themeReturn.setAppearance,
    cycleAppearance: themeReturn.cycleAppearance,
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
export function useThemeStores(options?: UseThemeOptions): ThemeStoresContext {
  const injected = inject(themeStoresKey, undefined);
  if (injected) {
    return injected;
  }

  // Create new theme stores if not provided
  const themeReturn = useTheme(options);
  return {
    activeAppearance: themeReturn.activeAppearance as unknown as Ref<Appearance>,
    selectedAppearance: themeReturn.selectedAppearance,
    theme: themeReturn.theme as unknown as Ref<Theme>,
    setAppearance: themeReturn.setAppearance,
    cycleAppearance: themeReturn.cycleAppearance,
    resolveColor: themeReturn.resolveColor as <T>(input: T) => Ref<string | T | undefined>,
    resolveColorsObject: themeReturn.resolveColorsObject as <T>(input: Record<string, T> | undefined) => Ref<Record<string, string | T | undefined> | undefined>,
    resolveColorPalette: themeReturn.resolveColorPalette as (input: string | string[]) => Ref<string[] | undefined>,
    resolveColorScale: themeReturn.resolveColorScale as (input: string | string[]) => Ref<string[] | undefined>
  };
}
