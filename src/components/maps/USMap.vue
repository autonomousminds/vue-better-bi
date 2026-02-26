<script setup lang="ts">
/**
 * USMap component
 * Choropleth map of the United States
 * Fetches TopoJSON from us-atlas CDN and converts to GeoJSON via topojson-client.
 */

import { computed, ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { feature } from 'topojson-client';
import type { USMapProps } from '../../types';
import EChartsBase from '../core/EChartsBase.vue';
import ChartFooter from '../core/ChartFooter.vue';
import { useThemeStores } from '../../composables/useTheme';
import { formatValue, formatTitle, getFormatObjectFromString } from '../../utils/formatting';
import { checkInputs } from '../../utils/checkInputs';

const props = withDefaults(defineProps<USMapProps>(), {
  height: '500px',
  width: '100%',
  legend: true,
  abbreviations: false,
  filter: false,
  downloadableData: true,
  downloadableImage: true
});

const emit = defineEmits<{
  (e: 'click', params: unknown): void;
}>();

const { resolveColorScale } = useThemeStores();

// Resolve color scale
const colorScaleResolved = computed(() =>
  resolveColorScale(props.colorScale || 'blue').value
);

// Get format objects
const valueFormat = computed(() =>
  props.valueFmt ? getFormatObjectFromString(props.valueFmt) : undefined
);

// Input validation
const validation = computed(() => {
  return checkInputs(props.data, [props.state, props.value]);
});

// GeoJSON loaded state
const geoJsonLoaded = ref(false);
const loadError = ref<string | undefined>(undefined);

// FIPS code to state name mapping (used by us-atlas states-10m.json feature IDs)
const FIPS_TO_STATE: Record<string, string> = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  '10': 'Delaware',
  '11': 'District of Columbia',
  '12': 'Florida',
  '13': 'Georgia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming',
  '60': 'American Samoa',
  '66': 'Guam',
  '69': 'Northern Mariana Islands',
  '72': 'Puerto Rico',
  '78': 'U.S. Virgin Islands'
};

// State name to abbreviation mapping
const STATE_TO_ABBREV: Record<string, string> = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
};

// Reverse lookup: abbreviation to state name
const ABBREV_TO_STATE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_TO_ABBREV).map(([name, abbrev]) => [abbrev, name])
);

// Load US GeoJSON on mount
onMounted(async () => {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
    const topoData = await response.json();

    // Convert TopoJSON to GeoJSON
    const geoJson = feature(topoData, topoData.objects.states) as unknown as GeoJSON.FeatureCollection;

    // Enrich features with name and abbreviation properties using FIPS codes
    for (const feat of geoJson.features) {
      const fipsId = String(feat.id).padStart(2, '0');
      const stateName = feat.properties?.name || FIPS_TO_STATE[fipsId] || `Unknown (${fipsId})`;
      feat.properties = {
        ...feat.properties,
        name: stateName,
        abbrev: STATE_TO_ABBREV[stateName] || stateName
      };
    }

    // Register map with Alaska/Hawaii repositioning insets
    // Include both full name and abbreviation keys for the insets
    echarts.registerMap('US', geoJson as any, {
      Alaska: { left: -128, top: 25, width: 12, height: 7 },
      AK: { left: -128, top: 25, width: 12, height: 7 },
      Hawaii: { left: -114, top: 26, width: 5 },
      HI: { left: -114, top: 26, width: 5 }
    });

    geoJsonLoaded.value = true;
  } catch (error) {
    console.error('Failed to load US GeoJSON:', error);
    loadError.value = `Failed to load US map data: ${error instanceof Error ? error.message : String(error)}`;
  }
});

// Determine which name property to use based on abbreviations prop
const nameProperty = computed(() => (props.abbreviations ? 'abbrev' : 'name'));

// Process map data
const mapData = computed(() => {
  if (!validation.value.valid || !props.data?.length || !props.state || !props.value) {
    return { data: [], min: 0, max: 0 };
  }

  let min = Infinity;
  let max = -Infinity;

  const data = props.data.map((row) => {
    const rawValue = row[props.value] as number;
    const rawState = String(row[props.state]);

    // Resolve the state name to match the nameProperty used by the map
    let resolvedName: string;
    if (props.abbreviations) {
      // If data uses full names, convert to abbreviation
      resolvedName = STATE_TO_ABBREV[rawState] || rawState;
    } else {
      // If data uses abbreviations, convert to full name
      resolvedName = ABBREV_TO_STATE[rawState] || rawState;
    }

    if (rawValue != null) {
      min = Math.min(min, rawValue);
      max = Math.max(max, rawValue);
    }

    return {
      name: resolvedName,
      value: rawValue
    };
  });

  // Handle empty data
  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  // Override with props if provided
  if (props.min !== undefined) min = props.min;
  if (props.max !== undefined) max = props.max;

  return { data, min, max };
});

// Format column name for tooltip display
const valueColumnTitle = computed(() => formatTitle(props.value));

// Build chart config
const chartConfig = computed<EChartsOption>(() => {
  const { data, min, max } = mapData.value;

  return {
    title: {
      text: props.title,
      subtext: props.subtitle
    },
    tooltip: {
      trigger: 'item' as const,
      showDelay: 0,
      transitionDuration: 0.2,
      confine: true,
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number };
        const displayValue =
          p.value != null && !Number.isNaN(p.value)
            ? formatValue(p.value, valueFormat.value)
            : '-';
        let output = `<span style='font-weight: 600;'>${p.name}</span><br/>`;
        output += `<span>${valueColumnTitle.value}: </span>`;
        output += `<span style='float:right; margin-left: 10px;'>${displayValue}</span>`;
        return output;
      }
    },
    visualMap: {
      type: 'continuous' as const,
      show: props.legend,
      min,
      max,
      left: 'left',
      top: 'bottom',
      calculable: props.filter,
      inRange: {
        color: colorScaleResolved.value || ['#e0f3db', '#0868ac']
      },
      ...(props.filter
        ? {}
        : {
            text: [
              formatValue(max, valueFormat.value),
              formatValue(min, valueFormat.value)
            ]
          }),
      formatter: ((val: unknown) => {
        return formatValue(Number(val), valueFormat.value);
      }) as unknown as string
    },
    series: [
      {
        name: valueColumnTitle.value,
        type: 'map',
        map: 'US',
        roam: true,
        nameProperty: nameProperty.value,
        emphasis: {
          label: {
            show: true
          }
        },
        data: geoJsonLoaded.value ? data : []
      }
    ]
  };
});

const hovering = ref(false);
</script>

<template>
  <!-- Validation error state -->
  <div v-if="!validation.valid" class="map-error">
    <div class="map-error-content">
      <span class="map-error-icon">!</span>
      <span>{{ validation.error }}</span>
    </div>
  </div>
  <!-- Map load error -->
  <div v-else-if="loadError" class="map-error">
    <div class="map-error-content">
      <span class="map-error-icon">!</span>
      <span>{{ loadError }}</span>
    </div>
  </div>
  <!-- Loading state -->
  <div v-else-if="!geoJsonLoaded" class="map-loading">
    Loading map data...
  </div>
  <!-- Chart -->
  <EChartsBase
    v-else
    :config="chartConfig"
    :height="props.height"
    :width="props.width"
    :renderer="props.renderer"
    :echarts-options="props.echartsOptions"
    :background-color="props.backgroundColor"
    @click="emit('click', $event)"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template #footer>
      <ChartFooter
        :config="chartConfig"
        :data="props.data"
        :chart-title="props.title"
        :echarts-options="props.echartsOptions"
        :downloadable-data="props.downloadableData"
        :downloadable-image="props.downloadableImage"
        :visible="hovering"
      />
    </template>
  </EChartsBase>
</template>

<style scoped>
.map-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('props.height');
  color: #666;
}

.map-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('props.height');
  color: #dc3545;
  padding: 1rem;
}

.map-error-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 0.75rem 1rem;
}

.map-error-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}
</style>
