export type ControlType =
  | 'checkbox'
  | 'select'
  | 'number'
  | 'slider'
  | 'text'
  | 'color';

export interface PropDefinition {
  name: string;
  label: string;
  control: ControlType;
  defaultValue: unknown;
  group: string;
  options?: { label: string; value: unknown }[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  showWhen?: (state: Record<string, unknown>) => boolean;
  subProps?: PropDefinition[];
}

export interface ChartDefinition {
  id: string;
  name: string;
  componentName: string;
  category: 'Standard Charts' | 'Statistical' | 'Part-to-Whole' | 'Relational' | 'Maps';
  description: string;
  dataBindings: Record<string, string | string[]>;
  supportsReferences: boolean;
  props: PropDefinition[];
  sampleDataKey: string;
}
