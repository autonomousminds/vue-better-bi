import { computed } from 'vue';
import type { ChartDefinition, PropDefinition } from '../types/playground.types';

function formatPropValue(name: string, val: unknown, _propDef?: PropDefinition): string {
  if (typeof val === 'boolean') {
    return val ? `  ${name}` : `  :${name}="false"`;
  }
  if (typeof val === 'number') {
    return `  :${name}="${val}"`;
  }
  if (typeof val === 'string') {
    return `  ${name}="${val}"`;
  }
  if (Array.isArray(val)) {
    const items = val.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
    return `  :${name}="[${items}]"`;
  }
  if (typeof val === 'object' && val !== null) {
    const json = JSON.stringify(val);
    return `  :${name}="${json}"`;
  }
  return '';
}

export function useCodeGenerator(
  chart: () => ChartDefinition,
  state: () => Record<string, unknown>,
  data: () => Record<string, unknown>[],
  columnConfigs?: () => Record<string, Record<string, unknown>>,
) {
  const generatedCode = computed(() => {
    const c = chart();
    const s = state();
    const d = data();

    const componentName = c.componentName;
    const imports = [componentName];
    const propLines: string[] = [];

    // Data binding
    propLines.push(`  :data="data"`);

    // Data binding props
    for (const [key, value] of Object.entries(c.dataBindings)) {
      if (Array.isArray(value)) {
        const items = value.map(v => `'${v}'`).join(', ');
        propLines.push(`  :${key}="[${items}]"`);
      } else {
        propLines.push(`  ${key}="${value}"`);
      }
    }

    // Non-default props from state
    const skipProps = new Set(['data', ...Object.keys(c.dataBindings)]);
    const configVars: { name: string; value: unknown }[] = [];

    for (const propDef of c.props) {
      if (skipProps.has(propDef.name)) continue;

      if (propDef.subProps) {
        // Compound prop
        const enabled = s[propDef.name];
        if (enabled === false && propDef.defaultValue === true) {
          propLines.push(`  :${propDef.name}="false"`);
        } else if (enabled === true) {
          const config: Record<string, unknown> = {};
          let hasNonDefault = false;
          for (const sub of propDef.subProps) {
            const val = s[`${propDef.name}.${sub.name}`];
            if (val !== sub.defaultValue && val !== undefined && val !== '') {
              config[sub.name] = val;
              hasNonDefault = true;
            }
          }
          if (hasNonDefault) {
            const varName = `${propDef.name}Config`;
            configVars.push({ name: varName, value: config });
            propLines.push(`  :${propDef.name}="${varName}"`);
          } else if (propDef.defaultValue !== true) {
            propLines.push(`  :${propDef.name}="true"`);
          }
        }
        continue;
      }

      const val = s[propDef.name];
      if (val === undefined) continue;
      if (val === propDef.defaultValue) continue;
      if (val === '' && (propDef.defaultValue === '' || propDef.defaultValue === undefined)) continue;

      const line = formatPropValue(propDef.name, val, propDef);
      if (line) propLines.push(line);
    }

    // Check for column configs
    const colConfigs = columnConfigs ? columnConfigs() : {};
    const hasColumnConfigs = Object.keys(colConfigs).length > 0;

    if (hasColumnConfigs) {
      imports.push('Column');
    }

    // Build script section
    let script = `<script setup>\n`;
    script += `import { ${imports.join(', ')} } from 'vue-better-echarts'\n\n`;

    // Data (truncated)
    const sampleRows = d.slice(0, 5);
    script += `const data = ${JSON.stringify(sampleRows, null, 2)}`;
    if (d.length > 5) {
      script += `\n// ... ${d.length - 5} more rows`;
    }
    script += `\n`;

    // Config variables
    for (const cv of configVars) {
      script += `\nconst ${cv.name} = ${JSON.stringify(cv.value, null, 2)}\n`;
    }

    script += `</script>`;

    // Build template
    let template = `\n\n<template>\n`;

    if (hasColumnConfigs) {
      template += `  <${componentName}\n`;
      template += propLines.join('\n') + '\n';
      template += `  >\n`;

      for (const [colId, colProps] of Object.entries(colConfigs)) {
        const props = colProps as Record<string, unknown>;
        // Only emit detailed Column tags for columns with more than just { id }
        const propKeys = Object.keys(props).filter(k => k !== 'id');
        if (propKeys.length === 0) continue;

        const colPropParts: string[] = [`id="${colId}"`];
        for (const key of propKeys) {
          const val = props[key];
          if (val === undefined || val === '' || val === false) continue;
          if (val === true) {
            colPropParts.push(key);
          } else if (typeof val === 'number') {
            colPropParts.push(`:${key}="${val}"`);
          } else if (Array.isArray(val)) {
            const items = val.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
            colPropParts.push(`:${key}="[${items}]"`);
          } else {
            colPropParts.push(`${key}="${val}"`);
          }
        }

        if (colPropParts.length <= 3) {
          template += `    <Column ${colPropParts.join(' ')} />\n`;
        } else {
          template += `    <Column\n`;
          for (const part of colPropParts) {
            template += `      ${part}\n`;
          }
          template += `    />\n`;
        }
      }

      template += `  </${componentName}>\n`;
    } else {
      template += `  <${componentName}\n`;
      template += propLines.join('\n') + '\n';
      template += `  />\n`;
    }

    template += `</template>`;

    return script + template;
  });

  return { generatedCode };
}
