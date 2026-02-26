<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue';
import type { BigValueProps } from '../../types';
import { formatValue, getFormatObjectFromString, formatTitle } from '../../utils/formatting';
import { aggregateColumn } from '../../utils/tableUtils';
import { checkInputs } from '../../utils/checkInputs';
import { useThemeStores } from '../../composables/useTheme';
import BigValueSparkline from './BigValueSparkline.vue';
import DeltaCell from '../table/DeltaCell.vue';

const { theme, resolveColor } = useThemeStores();
const titleColor = computed(() => theme.value.colors['base-heading']);
const subtitleColor = computed(() => theme.value.colors['base-content-muted']);

const props = withDefaults(defineProps<BigValueProps>(), {
  comparisonDelta: true,
  comparisonDisplay: 'percent',
  sparklineType: 'line',
  sparklineYScale: false,
  downIsGood: false,
  neutralMin: 0,
  neutralMax: 0,
  maxWidth: '100%',
  minWidth: '18%',
  redNegatives: false,
  emptySet: 'warn',
});

// --- Input validation ---
const validation = computed(() => {
  const optionalCols = [props.comparison, props.sparkline].filter(
    (c): c is string => c != null && c !== ''
  );
  return checkInputs(props.data, [props.value], optionalCols.length > 0 ? optionalCols : undefined);
});

const hasData = computed(() => {
  return validation.value.valid && normalizedData.value.length > 0;
});

// --- Display mode toggle ---
const displayMode = ref<'percent' | 'absolute'>(props.comparisonDisplay);

watch(() => props.comparisonDisplay, (val) => {
  displayMode.value = val;
});

const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'percent' ? 'absolute' : 'percent';
};

// --- Data normalization ---
const normalizedData = computed(() => {
  if (!props.data) return [];
  return Array.isArray(props.data) ? props.data : [props.data];
});

// --- Format objects ---
const valueFormatObject = computed(() => {
  if (props.fmt) return getFormatObjectFromString(props.fmt);
  return undefined;
});

const comparisonFormatObject = computed(() => {
  if (props.comparisonFmt) return getFormatObjectFromString(props.comparisonFmt);
  return undefined;
});

// --- Main value ---
const mainRawValue = computed(() => {
  const data = normalizedData.value;
  if (!data.length || !props.value) return null;
  if (props.agg) {
    const result = aggregateColumn(data, props.value, props.agg, 'number');
    return result != null ? Number(result) : null;
  }
  const raw = data[0][props.value];
  return raw != null ? Number(raw) : null;
});

const displayValue = computed(() => {
  if (mainRawValue.value === null) return '-';
  return formatValue(mainRawValue.value, valueFormatObject.value);
});

// --- Resolved value color ---
const resolvedValueColor = computed(() => {
  if (props.valueColor) {
    return resolveColor(props.valueColor).value;
  }
  return undefined;
});

// --- Value style (combines valueColor and redNegatives) ---
const valueStyle = computed(() => {
  // redNegatives takes priority if value is negative
  if (props.redNegatives && mainRawValue.value !== null && mainRawValue.value < 0) {
    return { color: '#dc2626' }; // red-600
  }
  if (resolvedValueColor.value) {
    return { color: resolvedValueColor.value as string };
  }
  return {};
});

// --- Titles ---
const resolvedTitle = computed(() => {
  if (props.title) return props.title;
  if (props.value) return formatTitle(props.value);
  return '';
});

const resolvedComparisonTitle = computed(() => {
  if (props.comparisonTitle) return props.comparisonTitle;
  if (props.comparison) return formatTitle(props.comparison);
  return '';
});

// --- Comparison value ---
const comparisonRawValue = computed(() => {
  const data = normalizedData.value;
  if (!data.length || !props.comparison) return null;
  if (props.comparisonAgg) {
    const result = aggregateColumn(data, props.comparison, props.comparisonAgg, 'number');
    return result != null ? Number(result) : null;
  }
  const raw = data[0][props.comparison];
  return raw != null ? Number(raw) : null;
});

const deltaPercent = computed(() => {
  if (mainRawValue.value == null || comparisonRawValue.value == null || comparisonRawValue.value === 0) return null;
  return (mainRawValue.value - comparisonRawValue.value) / Math.abs(comparisonRawValue.value);
});

const deltaAbsolute = computed(() => {
  if (mainRawValue.value == null || comparisonRawValue.value == null) return null;
  return mainRawValue.value - comparisonRawValue.value;
});

const deltaDisplayValue = computed(() =>
  displayMode.value === 'percent' ? deltaPercent.value : deltaAbsolute.value
);

const deltaFormatObject = computed(() => {
  if (displayMode.value === 'percent') {
    return getFormatObjectFromString('pct1');
  }
  return comparisonFormatObject.value ?? valueFormatObject.value;
});

const comparisonDisplayValue = computed(() => {
  if (comparisonRawValue.value === null) return '-';
  return formatValue(comparisonRawValue.value, comparisonFormatObject.value ?? valueFormatObject.value);
});

// --- Sparkline ---
const sparklineEffectiveValueFmt = computed(() => props.fmt ?? props.sparklineValueFmt);

const hasSparkline = computed(() => !!props.sparkline && normalizedData.value.length > 0);
const hasComparison = computed(() => !!props.comparison && normalizedData.value.length > 0);

// --- Empty state message ---
const emptyStateMessage = computed(() => {
  return props.emptyMessage ?? 'No data found';
});

// --- Truncation tooltip logic ---
const titleRef = ref<HTMLElement>();
const subtitleRef = ref<HTMLElement>();
const isTitleTruncated = ref(false);
const isSubtitleTruncated = ref(false);
const titleHover = ref(false);
const subtitleHover = ref(false);
const tooltipStyle = ref<Record<string, string>>({});

function isTruncated(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth;
}

function checkTruncation() {
  if (titleRef.value) {
    isTitleTruncated.value = isTruncated(titleRef.value);
  }
  if (subtitleRef.value) {
    isSubtitleTruncated.value = isTruncated(subtitleRef.value);
  }
}

function showTooltip(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  tooltipStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    maxWidth: `${Math.min(rect.width * 2, 400)}px`,
  };
}

function onTitleEnter() {
  if (!titleRef.value) return;
  isTitleTruncated.value = isTruncated(titleRef.value);
  if (isTitleTruncated.value) {
    showTooltip(titleRef.value);
    titleHover.value = true;
  }
}

function onSubtitleEnter() {
  if (!subtitleRef.value) return;
  isSubtitleTruncated.value = isTruncated(subtitleRef.value);
  if (isSubtitleTruncated.value) {
    showTooltip(subtitleRef.value);
    subtitleHover.value = true;
  }
}

onMounted(() => checkTruncation());
watch([resolvedTitle, () => props.subtitle], () => nextTick(checkTruncation));
</script>

<template>
  <div
    class="big-value"
    :style="{ minWidth: minWidth, maxWidth: maxWidth }"
  >
    <!-- Validation error state -->
    <div v-if="!validation.valid" class="bigvalue-error">
      <span class="bigvalue-error-icon">!</span>
      <span>{{ validation.error }}</span>
    </div>

    <!-- Empty data state -->
    <template v-else-if="!hasData">
      <img
        v-if="titleIcon"
        :src="titleIcon"
        class="big-value-title-icon"
        alt=""
      />
      <p v-if="resolvedTitle" class="big-value-title" :style="{ color: titleColor }">{{ resolvedTitle }}</p>
      <p v-if="subtitle" class="big-value-subtitle" :style="{ color: subtitleColor }">{{ subtitle }}</p>
      <div v-if="emptySet !== 'pass'" :class="['empty-state', emptySet === 'error' ? 'empty-error' : 'empty-info']">
        {{ emptyStateMessage }}
      </div>
    </template>

    <!-- Normal display -->
    <template v-else>
      <img
        v-if="titleIcon"
        :src="titleIcon"
        class="big-value-title-icon"
        alt=""
      />
      <p
        v-if="resolvedTitle"
        ref="titleRef"
        class="big-value-title"
        :class="[titleClass, { 'is-truncated': isTitleTruncated }]"
        :style="{ color: titleColor }"
        @mouseenter="onTitleEnter"
        @mouseleave="titleHover = false"
      >
        {{ resolvedTitle }}
        <span v-if="description" class="info-tooltip" :title="description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="info-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>
      </p>
      <p
        v-if="subtitle"
        ref="subtitleRef"
        class="big-value-subtitle"
        :class="{ 'is-truncated': isSubtitleTruncated }"
        :style="{ color: subtitleColor }"
        @mouseenter="onSubtitleEnter"
        @mouseleave="subtitleHover = false"
      >
        {{ subtitle }}
      </p>

      <Teleport to="body">
        <div
          v-if="titleHover && isTitleTruncated"
          class="big-value-tooltip"
          :style="tooltipStyle"
        >
          {{ resolvedTitle }}
        </div>
        <div
          v-if="subtitleHover && isSubtitleTruncated"
          class="big-value-tooltip big-value-tooltip--sub"
          :style="tooltipStyle"
        >
          {{ subtitle }}
        </div>
      </Teleport>

      <div :class="['big-value-main', valueClass]">
        <a v-if="link" :href="link" class="big-value-link" :style="valueStyle">
          {{ displayValue }}
        </a>
        <span v-else :style="valueStyle">{{ displayValue }}</span>

        <BigValueSparkline
          v-if="hasSparkline"
          :data="normalizedData"
          :dateCol="sparkline!"
          :valueCol="sparklineY ?? value"
          :type="sparklineType"
          :color="sparklineColor"
          :yScale="sparklineYScale"
          :valueFmt="sparklineEffectiveValueFmt"
          :dateFmt="sparklineDateFmt"
          :connectGroup="connectGroup"
          :width="120"
          :height="32"
        />
      </div>

      <div
        v-if="hasComparison"
        :class="['big-value-comparison', comparisonClass, { 'big-value-comparison--clickable': comparisonDelta }]"
        @click="comparisonDelta ? toggleDisplayMode() : undefined"
      >
        <template v-if="comparisonDelta && deltaDisplayValue !== null">
          <DeltaCell
            :value="deltaDisplayValue"
            :downIsGood="downIsGood"
            :neutralMin="neutralMin"
            :neutralMax="neutralMax"
            :formatObject="deltaFormatObject"
            symbolPosition="left"
            :text="resolvedComparisonTitle"
          />
          <span class="big-value-mode-hint">{{ displayMode === 'percent' ? '%' : '#' }}</span>
        </template>
        <template v-else-if="!comparisonDelta">
          <a v-if="link" :href="link" class="big-value-link">
            {{ comparisonDisplayValue }}
          </a>
          <span v-else>{{ comparisonDisplayValue }}</span>
          <span class="big-value-comparison-label">{{ resolvedComparisonTitle }}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
.big-value {
  display: inline-block;
  font-family: sans-serif;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  padding-left: 0;
  margin-right: 0.75rem;
  vertical-align: top;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}

.big-value-title-icon {
  width: 35px;
  height: 35px;
  margin: 0 0 20px;
  display: block;
}

.big-value-title,
.big-value-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.big-value-title.is-truncated,
.big-value-subtitle.is-truncated {
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
}

.big-value-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.big-value-subtitle {
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.4;
  margin: 2px 0 0 0;
}

.big-value-main {
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: 0.375rem;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  position: relative;
}

.big-value-link {
  text-decoration: none;
  color: inherit;
}

.big-value-link:hover {
  background-color: var(--base-200, #f3f4f6);
}

.big-value-comparison {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.big-value-comparison--clickable {
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.15s;
}

.big-value-comparison--clickable:hover {
  background-color: var(--base-200, #f3f4f6);
}

.big-value-mode-hint {
  display: inline-block;
  margin-left: 0.25rem;
  font-size: 0.625rem;
  opacity: 0.4;
  vertical-align: middle;
}

.big-value-comparison-label {
  margin-left: 0.25rem;
  opacity: 0.6;
}

/* Info tooltip icon */
.info-tooltip {
  display: inline-flex;
  align-items: center;
  cursor: help;
  opacity: 0.5;
  flex-shrink: 0;
}

.info-tooltip:hover {
  opacity: 0.8;
}

.info-icon {
  vertical-align: middle;
}

/* Error state */
.bigvalue-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.9em;
  background-color: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.bigvalue-error-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Empty states */
.empty-state {
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-top: 4px;
}

.empty-info {
  background-color: rgba(107, 114, 128, 0.06);
  border: 1px solid rgba(107, 114, 128, 0.15);
  color: #6b7280;
}

.empty-error {
  background-color: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
</style>

<style>
.big-value-tooltip {
  position: fixed;
  z-index: 9999;
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 600;
  font-family: sans-serif;
  line-height: 1.3;
  color: #1f2937;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  white-space: normal;
  word-break: break-word;
  pointer-events: none;
}
.big-value-tooltip--sub {
  font-weight: 400;
  font-size: 12px;
}
</style>
