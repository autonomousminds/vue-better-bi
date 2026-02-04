/**
 * ECharts theme configuration
 * Light and dark theme support with customizable colors
 */

import type { EChartsThemeConfig, Appearance, Theme } from '../types';

// Default theme colors - computed using the algorithm from computeShades.js
// Based on base-100 light: #ffffff, dark: #09090b
const defaultThemeColors = {
  light: {
    'base-100': '#ffffff',
    'base-200': '#f5f5f5',
    'base-300': '#d4d4d4',
    'base-content': '#404040',
    'base-content-muted': '#737373',
    'base-heading': '#0d0d0d'
  },
  dark: {
    'base-100': '#09090b',
    'base-200': '#18181b',
    'base-300': '#3f3f46',
    'base-content': '#d4d4d8',
    'base-content-muted': '#71717a',
    'base-heading': '#fafafa'
  }
};

// Default color palette
const defaultColorPalette = [
  '#236aa4',
  '#45a1bf',
  '#a5cdee',
  '#8dacbf',
  '#85c7c6',
  '#d2c6ac',
  '#f4b548',
  '#8f3d56',
  '#71b9f4',
  '#46a485'
];

// User-configurable themes
let themes: { light: Theme; dark: Theme } = {
  light: {
    colors: defaultThemeColors.light,
    colorPalettes: {
      default: defaultColorPalette
    },
    colorScales: {
      default: ['#ADD8E6', '#00008B'],
      blue: ['#ADD8E6', '#00008B'],
      green: ['#90EE90', '#006400'],
      red: ['#FFB6C1', '#8B0000'],
      orange: ['#FFDAB9', '#FF4500'],
      purple: ['#E6E6FA', '#4B0082']
    }
  },
  dark: {
    colors: defaultThemeColors.dark,
    colorPalettes: {
      default: defaultColorPalette
    },
    colorScales: {
      default: ['#ADD8E6', '#00008B'],
      blue: ['#ADD8E6', '#00008B'],
      green: ['#90EE90', '#006400'],
      red: ['#FFB6C1', '#8B0000'],
      orange: ['#FFDAB9', '#FF4500'],
      purple: ['#E6E6FA', '#4B0082']
    }
  }
};

/**
 * Configures the themes with custom colors and palettes
 */
export function configureThemes(customThemes: { light?: Partial<Theme>; dark?: Partial<Theme> }): void {
  if (customThemes.light) {
    themes.light = {
      ...themes.light,
      ...customThemes.light,
      colors: { ...themes.light.colors, ...customThemes.light.colors },
      colorPalettes: { ...themes.light.colorPalettes, ...customThemes.light.colorPalettes },
      colorScales: { ...themes.light.colorScales, ...customThemes.light.colorScales }
    };
  }
  if (customThemes.dark) {
    themes.dark = {
      ...themes.dark,
      ...customThemes.dark,
      colors: { ...themes.dark.colors, ...customThemes.dark.colors },
      colorPalettes: { ...themes.dark.colorPalettes, ...customThemes.dark.colorPalettes },
      colorScales: { ...themes.dark.colorScales, ...customThemes.dark.colorScales }
    };
  }
}

/**
 * Gets the current themes configuration
 */
export function getThemes(): { light: Theme; dark: Theme } {
  return themes;
}

/**
 * Creates an ECharts theme object for the given appearance mode
 */
export function createEChartsTheme(mode: Appearance): EChartsThemeConfig {
  const currentTheme = themes[mode];
  const colors = currentTheme.colors;

  const axisBaselineColor = colors['base-content-muted'];
  const axisTickColor = colors['base-content-muted'];
  const axisLabelColor = colors['base-content-muted'];
  const gridlineColor = colors['base-300'];
  const axisTitleBackgroundColor = colors['base-100'];
  const legendTextColor = colors['base-content-muted'];
  const legendPageIconColor = colors['base-content-muted'];
  const legendPageTextColor = colors['base-content-muted'];
  const tooltipBorderColor = colors['base-300'];
  const tooltipBackgroundColor = colors['base-100'];
  const tooltipTextColor = colors['base-content'];
  const titleColor = colors['base-heading'];
  const subtitleColor = colors['base-content-muted'];

  return {
    darkMode: mode === 'dark',
    backgroundColor: colors['base-100'],
    textStyle: {
      fontFamily: ['Inter', 'sans-serif']
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '0%',
      top: '15%',
      containLabel: true
    },
    color: currentTheme.colorPalettes.default,
    title: {
      padding: 0,
      itemGap: 7,
      textStyle: {
        fontSize: 14,
        color: titleColor
      },
      subtextStyle: {
        fontSize: 13,
        color: subtitleColor,
        overflow: 'break'
      },
      top: '1px'
    },
    line: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2,
        join: 'round'
      },
      symbolSize: 0,
      symbol: 'circle',
      smooth: false
    },
    radar: {
      itemStyle: {
        borderWidth: 0
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 0,
      symbol: 'circle',
      smooth: false
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    boxplot: {
      itemStyle: {
        borderWidth: 1.5
      }
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      }
    },
    candlestick: {
      itemStyle: {
        color: '#eb5454',
        color0: '#47b262',
        borderColor: '#eb5454',
        borderColor0: '#47b262',
        borderWidth: 1
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: '#cccccc'
      },
      lineStyle: {
        width: 1,
        color: '#aaaaaa'
      },
      symbolSize: 0,
      symbol: 'circle',
      smooth: false,
      color: [
        '#923d59',
        '#488f96',
        '#518eca',
        '#b3a9a0',
        '#ffc857',
        '#495867',
        '#bfdbf7',
        '#bc4749',
        '#eeebd0'
      ],
      label: {
        color: '#f2f2f2'
      }
    },
    map: {
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#444',
        borderWidth: 0.5
      },
      label: {
        color: '#000'
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        },
        label: {
          color: 'rgb(100,0,0)'
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#444',
        borderWidth: 0.5
      },
      label: {
        color: '#000'
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        },
        label: {
          color: 'rgb(100,0,0)'
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: axisBaselineColor
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: axisTickColor
        },
        length: 3,
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        color: axisLabelColor
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [gridlineColor]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: axisBaselineColor
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: axisTickColor
        },
        length: 2
      },
      axisLabel: {
        show: true,
        color: axisLabelColor
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [gridlineColor],
          width: 1
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
        }
      },
      nameTextStyle: {
        backgroundColor: axisTitleBackgroundColor
      }
    },
    logAxis: {
      axisLine: {
        show: false,
        lineStyle: {
          color: axisBaselineColor
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: axisTickColor
        },
        length: 2
      },
      axisLabel: {
        show: true,
        color: axisLabelColor
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: [gridlineColor]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
        }
      },
      nameTextStyle: {
        backgroundColor: axisTitleBackgroundColor
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: axisBaselineColor
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: axisTickColor
        },
        length: 3
      },
      axisLabel: {
        show: true,
        color: axisLabelColor
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: [gridlineColor]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        borderColor: '#999999'
      },
      emphasis: {
        iconStyle: {
          borderColor: '#459cde'
        }
      }
    },
    legend: {
      textStyle: {
        padding: [0, 0, 0, -7],
        color: legendTextColor
      },
      icon: 'circle',
      pageIcons: {
        horizontal: [
          'M 17 3 h 2 c 0.386 0 0.738 0.223 0.904 0.572 s 0.115 0.762 -0.13 1.062 L 11.292 15 l 8.482 10.367 c 0.245 0.299 0.295 0.712 0.13 1.062 S 19.386 27 19 27 h -2 c -0.3 0 -0.584 -0.135 -0.774 -0.367 l -9 -11 c -0.301 -0.369 -0.301 -0.898 0 -1.267 l 9 -11 C 16.416 3.135 16.7 3 17 3 Z',
          'M 12 27 h -2 c -0.386 0 -0.738 -0.223 -0.904 -0.572 s -0.115 -0.762 0.13 -1.062 L 17.708 15 L 9.226 4.633 c -0.245 -0.299 -0.295 -0.712 -0.13 -1.062 S 9.614 3 10 3 h 2 c 0.3 0 0.584 0.135 0.774 0.367 l 9 11 c 0.301 0.369 0.301 0.898 0 1.267 l -9 11 C 12.584 26.865 12.3 27 12 27 Z'
        ]
      },
      pageIconColor: legendPageIconColor,
      pageIconSize: 12,
      pageTextStyle: {
        color: legendPageTextColor
      },
      pageButtonItemGap: -2,
      animationDurationUpdate: 300
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#cccccc',
          width: 1
        },
        crossStyle: {
          color: '#cccccc',
          width: 1
        }
      },
      borderRadius: 4,
      borderWidth: 1,
      borderColor: tooltipBorderColor,
      backgroundColor: tooltipBackgroundColor,
      textStyle: {
        color: tooltipTextColor,
        fontSize: 12,
        fontWeight: 400
      },
      padding: 6
    },
    timeline: {
      lineStyle: {
        color: '#e3e3e3',
        width: 2
      },
      itemStyle: {
        color: '#d6d6d6',
        borderWidth: 1
      },
      controlStyle: {
        color: '#bfbfbf',
        borderColor: '#bfbfbf',
        borderWidth: 1
      },
      checkpointStyle: {
        color: '#8f8f8f',
        borderColor: '#ffffff'
      },
      label: {
        color: '#c9c9c9'
      },
      emphasis: {
        itemStyle: {
          color: '#9c9c9c'
        },
        controlStyle: {
          color: '#bfbfbf',
          borderColor: '#bfbfbf',
          borderWidth: 1
        },
        label: {
          color: '#c9c9c9'
        }
      }
    },
    visualMap: {
      color: ['#c41621', '#e39588', '#f5ed98']
    },
    dataZoom: {
      type: 'slider',
      bottom: 10,
      height: 30,
      showDetail: false,
      handleSize: '80%',
      borderColor: gridlineColor,
      handleStyle: {
        borderColor: gridlineColor,
        color: gridlineColor
      },
      moveHandleStyle: {
        borderColor: gridlineColor,
        color: gridlineColor
      },
      textStyle: {},
      emphasis: {
        handleStyle: {
          borderColor: gridlineColor,
          color: gridlineColor
        },
        moveHandleStyle: {
          borderColor: gridlineColor,
          color: gridlineColor
        }
      }
    },
    markPoint: {
      label: {
        color: '#f2f2f2'
      },
      emphasis: {
        label: {
          color: '#f2f2f2'
        }
      }
    }
  };
}

export const defaultThemeLight = createEChartsTheme('light');
export const defaultThemeDark = createEChartsTheme('dark');
