import { ref, watch } from 'vue';
import type { ECharts } from 'echarts';

const COMMIT_DELAY_MS = 100;

interface SeriesParams {
  componentType?: string;
  seriesName?: string;
}

export function useTooltipHoverHighlight() {
  const activeSeriesName = ref<string | null>(null);

  function onChartInit(chart: ECharts) {
    let pending: string | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let applyingEmphasis = false;

    // Schedule a transition of `activeSeriesName` to `next`. The first entry
    // from null is instant; everything else is debounced so transient
    // crossings during a horizontal scrub (between bands, between line
    // segments) don't flicker the highlight.
    function schedule(next: string | null) {
      if (next === activeSeriesName.value) {
        if (timer !== null) { clearTimeout(timer); timer = null; }
        pending = null;
        return;
      }
      pending = next;
      if (timer !== null) clearTimeout(timer);
      const instant = activeSeriesName.value === null && next !== null;
      const commit = () => {
        activeSeriesName.value = pending;
        pending = null;
        timer = null;
      };
      if (instant) commit();
      else timer = setTimeout(commit, COMMIT_DELAY_MS);
    }

    chart.on('mouseover', (raw) => {
      const p = raw as SeriesParams;
      if (p.componentType !== 'series') return;
      const name = typeof p.seriesName === 'string' ? p.seriesName : null;
      if (!name || name === 'stackTotal') return;
      schedule(name);
    });
    chart.on('mouseout', (raw) => {
      const p = raw as SeriesParams;
      if (p.componentType !== 'series') return;
      schedule(null);
    });

    // mouseleave on the chart container — ECharts' `globalout` fires whenever
    // the cursor merely crosses onto the HTML tooltip overlay, which falsely
    // looks like leaving the chart on tooltips that are taller than the canvas.
    chart.getDom().addEventListener('mouseleave', () => {
      if (timer !== null) { clearTimeout(timer); timer = null; }
      pending = null;
      activeSeriesName.value = null;
    });

    // Drive the chart's series emphasis from our state. ECharts' built-in
    // emphasis toggles off transiently between pre-interpolated line
    // segments; re-asserting on every `downplay` keeps the area bold for as
    // long as we have an active series.
    watch(activeSeriesName, (newName, oldName) => {
      applyingEmphasis = true;
      if (oldName) chart.dispatchAction({ type: 'downplay', seriesName: oldName });
      if (newName) chart.dispatchAction({ type: 'highlight', seriesName: newName });
      applyingEmphasis = false;
    });
    chart.on('downplay', () => {
      if (applyingEmphasis) return;
      const name = activeSeriesName.value;
      if (!name) return;
      requestAnimationFrame(() => {
        if (activeSeriesName.value === name) {
          chart.dispatchAction({ type: 'highlight', seriesName: name });
        }
      });
    });
  }

  return { activeSeriesName, onChartInit };
}
