import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-better-echarts': resolve(__dirname, '../../src/index.ts')
    }
  },
  optimizeDeps: {
    include: ['echarts', 'chroma-js', 'ssf', 'debounce', 'downloadjs', 'export-to-csv']
  }
});
