import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueEChartsCharts',
      formats: ['es', 'umd'],
      fileName: (format) => `vue-better-echarts.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['vue', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          echarts: 'echarts'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-better-echarts.css';
          return assetInfo.name || 'asset';
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  }
});
