<script setup lang="ts">
import type { PropDefinition } from '../../types/playground.types';

const props = defineProps<{
  definition: PropDefinition;
  modelValue: unknown;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: unknown];
}>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const def = props.definition;

  if (def.control === 'checkbox') {
    emit('update:modelValue', target.checked);
  } else if (def.control === 'number' || def.control === 'slider') {
    const val = target.value === '' ? undefined : Number(target.value);
    emit('update:modelValue', val);
  } else {
    emit('update:modelValue', target.value);
  }
}
</script>

<template>
  <div class="prop-control">
    <label class="prop-label">
      <!-- Checkbox -->
      <template v-if="definition.control === 'checkbox'">
        <input
          type="checkbox"
          :checked="!!modelValue"
          @change="onInput"
          class="prop-checkbox"
        />
        <span class="prop-label-text">{{ definition.label }}</span>
      </template>

      <!-- Select -->
      <template v-else-if="definition.control === 'select'">
        <span class="prop-label-text">{{ definition.label }}</span>
        <select
          :value="modelValue ?? ''"
          @change="onInput"
          class="prop-select"
        >
          <option
            v-for="opt in definition.options"
            :key="String(opt.value)"
            :value="opt.value"
            :disabled="String(opt.value).startsWith('_divider')"
          >
            {{ opt.label }}
          </option>
        </select>
      </template>

      <!-- Number -->
      <template v-else-if="definition.control === 'number'">
        <span class="prop-label-text">{{ definition.label }}</span>
        <input
          type="number"
          :value="modelValue ?? ''"
          @input="onInput"
          :min="definition.min"
          :max="definition.max"
          :step="definition.step ?? 1"
          class="prop-input prop-number"
        />
      </template>

      <!-- Slider -->
      <template v-else-if="definition.control === 'slider'">
        <span class="prop-label-text">
          {{ definition.label }}
          <span class="prop-value-badge">{{ modelValue }}</span>
        </span>
        <input
          type="range"
          :value="modelValue ?? 0"
          @input="onInput"
          :min="definition.min ?? 0"
          :max="definition.max ?? 1"
          :step="definition.step ?? 0.01"
          class="prop-slider"
        />
      </template>

      <!-- Color -->
      <template v-else-if="definition.control === 'color'">
        <span class="prop-label-text">{{ definition.label }}</span>
        <div class="color-wrapper">
          <input
            type="color"
            :value="modelValue || '#3b82f6'"
            @input="onInput"
            class="prop-color"
          />
          <input
            type="text"
            :value="modelValue ?? ''"
            @input="onInput"
            placeholder="auto"
            class="prop-input prop-color-text"
          />
        </div>
      </template>

      <!-- Text -->
      <template v-else>
        <span class="prop-label-text">{{ definition.label }}</span>
        <input
          type="text"
          :value="modelValue ?? ''"
          @input="onInput"
          class="prop-input"
        />
      </template>
    </label>
  </div>
</template>

<style scoped>
.prop-control {
  margin-bottom: 2px;
}
.prop-label {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}
.prop-label-text {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}
.prop-value-badge {
  font-size: 10px;
  padding: 0 4px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Checkbox layout */
label:has(.prop-checkbox) {
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}
.prop-checkbox {
  accent-color: var(--accent);
  width: 14px;
  height: 14px;
  cursor: pointer;
}

/* Inputs */
.prop-input, .prop-select {
  width: 100%;
  padding: 4px 8px;
  font-size: var(--font-size-sm);
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  outline: none;
  box-sizing: border-box;
}
.prop-input:focus, .prop-select:focus {
  border-color: var(--accent);
}
.prop-number {
  width: 80px;
}
.prop-select {
  cursor: pointer;
}

/* Slider */
.prop-slider {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}

/* Color */
.color-wrapper {
  display: flex;
  gap: 4px;
  align-items: center;
}
.prop-color {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  padding: 0;
  background: none;
}
.prop-color-text {
  flex: 1;
  min-width: 0;
}
</style>
