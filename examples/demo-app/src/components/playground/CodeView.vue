<script setup lang="ts">
import { computed } from 'vue';
import { usePlaygroundState } from '../../composables/usePlaygroundState';
import { useCodeGenerator } from '../../composables/useCodeGenerator';
import { highlightVueSFC } from '../../composables/useSyntaxHighlight';
import CopyButton from '../common/CopyButton.vue';

const { currentChart, currentState, currentData } = usePlaygroundState();
const { generatedCode } = useCodeGenerator(
  () => currentChart.value,
  () => currentState.value,
  () => currentData.value,
);

const highlightedCode = computed(() => highlightVueSFC(generatedCode.value));
</script>

<template>
  <div class="code-view">
    <div class="code-toolbar">
      <span class="code-label">Generated Vue SFC</span>
      <CopyButton :text="generatedCode" />
    </div>
    <pre class="code-block"><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<style scoped>
.code-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.code-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}
.code-label {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: 500;
}
.code-block {
  flex: 1;
  margin: 0;
  padding: var(--space-4);
  overflow: auto;
  background: var(--code-bg);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--text-primary);
  tab-size: 2;
}
.code-block :deep(.tok-keyword) { color: var(--code-keyword); }
.code-block :deep(.tok-tag) { color: var(--code-tag); }
.code-block :deep(.tok-attr) { color: var(--code-attr); }
.code-block :deep(.tok-string) { color: var(--code-string); }
.code-block :deep(.tok-number) { color: var(--code-number); }
.code-block :deep(.tok-comment) { color: var(--code-comment); font-style: italic; }
</style>
