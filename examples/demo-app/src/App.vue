<script setup lang="ts">
import { ref } from 'vue';
import {
  BarChart,
  LineChart,
  AreaChart,
  ScatterPlot,
  Heatmap,
  FunnelChart,
  SankeyDiagram,
  useThemeStores
} from 'vue-better-echarts';

// Initialize theme
const { activeAppearance, cycleAppearance } = useThemeStores();

// Sample data for charts
const salesData = ref([
  { month: 'Jan', sales: 12500, orders: 145, region: 'North' },
  { month: 'Feb', sales: 15200, orders: 178, region: 'North' },
  { month: 'Mar', sales: 18900, orders: 210, region: 'North' },
  { month: 'Apr', sales: 16400, orders: 189, region: 'North' },
  { month: 'May', sales: 21000, orders: 245, region: 'North' },
  { month: 'Jun', sales: 24500, orders: 289, region: 'North' },
  { month: 'Jan', sales: 9800, orders: 112, region: 'South' },
  { month: 'Feb', sales: 11200, orders: 134, region: 'South' },
  { month: 'Mar', sales: 14500, orders: 167, region: 'South' },
  { month: 'Apr', sales: 13200, orders: 152, region: 'South' },
  { month: 'May', sales: 17800, orders: 198, region: 'South' },
  { month: 'Jun', sales: 19200, orders: 221, region: 'South' }
]);

// Extended line data for zoom demos
const lineData = ref([
  { date: '2024-01', revenue: 45000, cost: 32000 },
  { date: '2024-02', revenue: 52000, cost: 35000 },
  { date: '2024-03', revenue: 61000, cost: 38000 },
  { date: '2024-04', revenue: 58000, cost: 36000 },
  { date: '2024-05', revenue: 72000, cost: 42000 },
  { date: '2024-06', revenue: 85000, cost: 48000 },
  { date: '2024-07', revenue: 78000, cost: 45000 },
  { date: '2024-08', revenue: 92000, cost: 52000 },
  { date: '2024-09', revenue: 88000, cost: 50000 },
  { date: '2024-10', revenue: 95000, cost: 54000 },
  { date: '2024-11', revenue: 102000, cost: 58000 },
  { date: '2024-12', revenue: 115000, cost: 62000 }
]);

// Large dataset for zoom demonstrations
const timeSeriesData = ref(
  Array.from({ length: 100 }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.round(1000 + Math.random() * 500 + Math.sin(i / 10) * 200),
    trend: Math.round(1000 + i * 5 + Math.random() * 100)
  }))
);

const scatterData = ref([
  { age: 25, income: 45000, spending: 1200 },
  { age: 32, income: 65000, spending: 2100 },
  { age: 28, income: 52000, spending: 1500 },
  { age: 45, income: 95000, spending: 3200 },
  { age: 38, income: 78000, spending: 2800 },
  { age: 52, income: 120000, spending: 4500 },
  { age: 29, income: 48000, spending: 1400 },
  { age: 35, income: 72000, spending: 2400 },
  { age: 41, income: 88000, spending: 3100 },
  { age: 48, income: 105000, spending: 3800 },
  { age: 22, income: 38000, spending: 900 },
  { age: 55, income: 135000, spending: 5200 },
  { age: 33, income: 68000, spending: 2300 },
  { age: 27, income: 50000, spending: 1350 },
  { age: 44, income: 92000, spending: 3400 },
  { age: 36, income: 75000, spending: 2600 },
  { age: 50, income: 115000, spending: 4100 },
  { age: 31, income: 62000, spending: 1900 },
  { age: 39, income: 82000, spending: 2900 },
  { age: 46, income: 98000, spending: 3600 }
]);

// Zoom configuration presets
const sliderZoom = {
  dataZoom: [
    {
      type: 'slider',
      start: 0,
      end: 100,
      height: 25,
      bottom: 10
    }
  ]
};

const insideZoom = {
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    }
  ]
};

const sliderAndInsideZoom = {
  dataZoom: [
    {
      type: 'slider',
      start: 0,
      end: 50,
      height: 25,
      bottom: 10
    },
    {
      type: 'inside'
    }
  ]
};

const toolboxWithZoom = {
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
        title: { zoom: 'Zoom', back: 'Reset' }
      },
      restore: { title: 'Restore' },
      saveAsImage: { title: 'Save' }
    },
    right: 20,
    top: 10
  },
  dataZoom: [
    { type: 'inside' }
  ]
};

const xyAxisZoom = {
  dataZoom: [
    { type: 'slider', xAxisIndex: 0, start: 0, end: 100, bottom: 10, height: 20 },
    { type: 'slider', yAxisIndex: 0, start: 0, end: 100, right: 10, width: 20 },
    { type: 'inside', xAxisIndex: 0 },
    { type: 'inside', yAxisIndex: 0 }
  ]
};

const heatmapData = ref([
  { day: 'Mon', hour: '9am', value: 45 },
  { day: 'Mon', hour: '12pm', value: 78 },
  { day: 'Mon', hour: '3pm', value: 62 },
  { day: 'Mon', hour: '6pm', value: 35 },
  { day: 'Tue', hour: '9am', value: 52 },
  { day: 'Tue', hour: '12pm', value: 89 },
  { day: 'Tue', hour: '3pm', value: 71 },
  { day: 'Tue', hour: '6pm', value: 42 },
  { day: 'Wed', hour: '9am', value: 48 },
  { day: 'Wed', hour: '12pm', value: 95 },
  { day: 'Wed', hour: '3pm', value: 68 },
  { day: 'Wed', hour: '6pm', value: 38 },
  { day: 'Thu', hour: '9am', value: 55 },
  { day: 'Thu', hour: '12pm', value: 82 },
  { day: 'Thu', hour: '3pm', value: 74 },
  { day: 'Thu', hour: '6pm', value: 45 },
  { day: 'Fri', hour: '9am', value: 42 },
  { day: 'Fri', hour: '12pm', value: 76 },
  { day: 'Fri', hour: '3pm', value: 58 },
  { day: 'Fri', hour: '6pm', value: 28 }
]);

const funnelData = ref([
  { stage: 'Visitors', count: 10000 },
  { stage: 'Leads', count: 5200 },
  { stage: 'Qualified', count: 2800 },
  { stage: 'Proposals', count: 1400 },
  { stage: 'Closed', count: 680 }
]);

const sankeyData = ref([
  { source: 'Website', target: 'Signup', value: 500 },
  { source: 'Email', target: 'Signup', value: 300 },
  { source: 'Social', target: 'Signup', value: 200 },
  { source: 'Signup', target: 'Trial', value: 700 },
  { source: 'Signup', target: 'Purchase', value: 100 },
  { source: 'Trial', target: 'Purchase', value: 350 }
]);
</script>

<template>
  <div class="app" :class="activeAppearance">
    <header>
      <h1>Vue ECharts Charts Demo</h1>
      <button @click="cycleAppearance" class="theme-toggle">
        {{ activeAppearance === 'light' ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </header>

    <main>
      <section class="chart-section">
        <h2>Bar Chart - Sales by Month & Region</h2>
        <BarChart
          :data="salesData"
          x="month"
          y="sales"
          series="region"
          title="Monthly Sales Performance"
          subtitle="Comparing North vs South regions"
          yFmt="usd0k"
          :legend="true"
          height="350px"
        />
      </section>

      <section class="chart-section">
        <h2>Stacked Bar Chart</h2>
        <BarChart
          :data="salesData"
          x="month"
          y="sales"
          series="region"
          title="Cumulative Sales by Region"
          yFmt="usd0k"
          :stacked="true"
          height="350px"
        />
      </section>

      <section class="chart-section">
        <h2>Line Chart - Basic (No Zoom)</h2>
        <LineChart
          :data="lineData"
          x="date"
          :y="['revenue', 'cost']"
          title="Revenue & Cost Trend"
          yFmt="usd0k"
          :markers="true"
          height="350px"
        />
      </section>

      <section class="chart-section">
        <h2>Line Chart - Slider Zoom</h2>
        <p class="hint">Drag the slider below the chart to zoom</p>
        <LineChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="100 Days of Data with Slider Zoom"
          :markers="false"
          height="350px"
          :echartsOptions="sliderZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Line Chart - Mouse Wheel Zoom</h2>
        <p class="hint">Use mouse wheel to zoom, drag to pan</p>
        <LineChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="Scroll to Zoom, Drag to Pan"
          :markers="false"
          height="350px"
          :echartsOptions="insideZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Line Chart - Slider + Mouse Zoom Combined</h2>
        <p class="hint">Both slider and mouse wheel zoom enabled (starts at 50%)</p>
        <LineChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="Combined Zoom Controls"
          :markers="false"
          height="380px"
          :echartsOptions="sliderAndInsideZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Line Chart - Toolbox with Zoom</h2>
        <p class="hint">Click the zoom icon in toolbox, then drag to select zoom area</p>
        <LineChart
          :data="lineData"
          x="date"
          :y="['revenue', 'cost']"
          title="Toolbox Zoom Controls"
          yFmt="usd0k"
          :markers="true"
          height="350px"
          :echartsOptions="toolboxWithZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Area Chart with Zoom</h2>
        <AreaChart
          :data="timeSeriesData"
          x="day"
          :y="['value', 'trend']"
          title="Area Chart - Slider Zoom"
          :stacked="false"
          height="380px"
          :echartsOptions="sliderAndInsideZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Scatter Plot - X & Y Axis Zoom</h2>
        <p class="hint">Zoom on both axes with sliders and mouse wheel</p>
        <ScatterPlot
          :data="scatterData"
          x="age"
          y="income"
          title="Customer Demographics"
          subtitle="Age vs Annual Income (Zoomable)"
          xAxisTitle="Age"
          yAxisTitle="Annual Income"
          yFmt="usd0k"
          height="400px"
          :echartsOptions="xyAxisZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Bar Chart with Zoom</h2>
        <p class="hint">Slider zoom works on bar charts too</p>
        <BarChart
          :data="salesData"
          x="month"
          y="sales"
          series="region"
          title="Sales with Zoom"
          yFmt="usd0k"
          :legend="true"
          height="380px"
          :echartsOptions="sliderZoom"
        />
      </section>

      <section class="chart-section">
        <h2>Heatmap - Activity by Day/Hour</h2>
        <Heatmap
          :data="heatmapData"
          x="hour"
          y="day"
          value="value"
          title="Website Traffic Heatmap"
          height="300px"
        />
      </section>

      <section class="chart-section">
        <h2>Funnel Chart - Sales Pipeline</h2>
        <FunnelChart
          :data="funnelData"
          name="stage"
          value="count"
          title="Sales Funnel"
          valueFmt="num0"
          height="350px"
        />
      </section>

      <section class="chart-section">
        <h2>Sankey Diagram - User Flow</h2>
        <SankeyDiagram
          :data="sankeyData"
          source="source"
          target="target"
          value="value"
          title="Customer Acquisition Flow"
          height="350px"
        />
      </section>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.app.light {
  background-color: #f5f5f5;
  color: #333;
}

.app.dark {
  background-color: #1a1a2e;
  color: #eee;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid currentColor;
  opacity: 0.8;
}

h1 {
  font-size: 1.8rem;
  font-weight: 600;
}

.theme-toggle {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.light .theme-toggle {
  background: #333;
  color: #fff;
}

.dark .theme-toggle {
  background: #fff;
  color: #333;
}

.theme-toggle:hover {
  transform: scale(1.05);
}

main {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 12px;
  transition: background-color 0.3s;
}

.light .chart-section {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .chart-section {
  background: #16213e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.chart-section h2 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

.chart-section .hint {
  margin: -10px 0 15px 0;
  font-size: 0.85rem;
  opacity: 0.6;
  font-style: italic;
}
</style>
