import { EChartsOption } from 'echarts';
import { ColorInput, ColorPaletteInput } from './theme.types';

export type XAxisType = 'category' | 'value' | 'time';
export type YAxisType = 'value' | 'log';
export type ChartRenderer = 'canvas' | 'svg';
export type StackType = 'stacked' | 'grouped' | 'stacked100';
export type LineType = 'solid' | 'dashed' | 'dotted';
export type MarkerShape = 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none';
export type StepPosition = 'start' | 'middle' | 'end';
export type HandleMissing = 'gap' | 'connect' | 'zero';
export type LabelPosition = 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'outside';
export interface DataRecord {
    [key: string]: unknown;
}
export interface BaseChartProps {
    data: DataRecord[];
    x?: string;
    y?: string | string[];
    y2?: string | string[];
    series?: string;
    size?: string;
    tooltipTitle?: string;
    xFmt?: string;
    yFmt?: string;
    y2Fmt?: string;
    sizeFmt?: string;
    labelFmt?: string;
    yLabelFmt?: string;
    y2LabelFmt?: string;
    title?: string;
    subtitle?: string;
    xAxisTitle?: string | boolean;
    yAxisTitle?: string | boolean;
    y2AxisTitle?: string | boolean;
    xType?: XAxisType;
    xMin?: number;
    xMax?: number;
    xBaseline?: boolean;
    xTickMarks?: boolean;
    xGridlines?: boolean;
    xAxisLabels?: boolean;
    showAllXAxisLabels?: boolean;
    xLabelWrap?: boolean;
    yType?: YAxisType;
    yLog?: boolean;
    yLogBase?: number;
    yMin?: number;
    yMax?: number;
    yScale?: boolean;
    yBaseline?: boolean;
    yTickMarks?: boolean;
    yGridlines?: boolean;
    yAxisLabels?: boolean;
    yAxisColor?: ColorInput;
    y2Min?: number;
    y2Max?: number;
    y2Scale?: boolean;
    y2Baseline?: boolean;
    y2TickMarks?: boolean;
    y2Gridlines?: boolean;
    y2AxisLabels?: boolean;
    y2AxisColor?: ColorInput;
    legend?: boolean;
    height?: string;
    width?: string;
    chartAreaHeight?: number;
    swapXY?: boolean;
    sort?: boolean;
    colorPalette?: ColorPaletteInput;
    seriesColors?: Record<string, ColorInput>;
    echartsOptions?: EChartsOption;
    seriesOptions?: Record<string, unknown>;
    renderer?: ChartRenderer;
    connectGroup?: string;
    downloadableData?: boolean;
    downloadableImage?: boolean;
    leftPadding?: string;
    rightPadding?: string;
}
export interface BarChartProps extends BaseChartProps {
    type?: StackType;
    fillColor?: ColorInput;
    fillOpacity?: number;
    outlineColor?: ColorInput;
    outlineWidth?: number;
    labels?: boolean;
    labelSize?: number;
    labelPosition?: LabelPosition;
    labelColor?: ColorInput;
    stackTotalLabel?: boolean;
    seriesLabels?: boolean;
    showAllLabels?: boolean;
    seriesOrder?: string[];
    seriesLabelFmt?: string;
    y2SeriesType?: 'bar' | 'line';
}
export interface LineChartProps extends BaseChartProps {
    lineColor?: ColorInput;
    lineType?: LineType;
    lineOpacity?: number;
    lineWidth?: number;
    markers?: boolean;
    markerShape?: MarkerShape;
    markerSize?: number;
    handleMissing?: HandleMissing;
    step?: boolean;
    stepPosition?: StepPosition;
    labels?: boolean;
    labelSize?: number;
    labelPosition?: LabelPosition;
    labelColor?: ColorInput;
    showAllLabels?: boolean;
    seriesOrder?: string[];
    seriesLabelFmt?: string;
    y2SeriesType?: 'line' | 'bar';
}
export interface AreaChartProps extends BaseChartProps {
    type?: 'stacked' | 'stacked100';
    fillColor?: ColorInput;
    fillOpacity?: number;
    lineColor?: ColorInput;
    lineType?: LineType;
    lineWidth?: number;
    markers?: boolean;
    markerShape?: MarkerShape;
    markerSize?: number;
    handleMissing?: HandleMissing;
    step?: boolean;
    stepPosition?: StepPosition;
    labels?: boolean;
    labelSize?: number;
    labelPosition?: LabelPosition;
    labelColor?: ColorInput;
    showAllLabels?: boolean;
    seriesOrder?: string[];
    seriesLabelFmt?: string;
}
export interface ScatterPlotProps extends BaseChartProps {
    pointColor?: ColorInput;
    pointOpacity?: number;
    pointSize?: number;
    pointShape?: MarkerShape;
    outlineColor?: ColorInput;
    outlineWidth?: number;
}
export interface BubbleChartProps extends BaseChartProps {
    pointColor?: ColorInput;
    pointOpacity?: number;
    minSize?: number;
    maxSize?: number;
    outlineColor?: ColorInput;
    outlineWidth?: number;
}
export interface BoxPlotProps extends BaseChartProps {
    min?: string;
    max?: string;
    midpoint?: string;
    confidenceIntervalLower?: string;
    confidenceIntervalUpper?: string;
    fillColor?: ColorInput;
    fillOpacity?: number;
    outlineColor?: ColorInput;
    outlineWidth?: number;
}
export interface HistogramProps extends BaseChartProps {
    fillColor?: ColorInput;
    fillOpacity?: number;
    outlineColor?: ColorInput;
    outlineWidth?: number;
    bins?: number;
}
export interface FunnelChartProps {
    data: DataRecord[];
    name?: string;
    value?: string;
    title?: string;
    subtitle?: string;
    legend?: boolean;
    height?: string;
    width?: string;
    chartAreaHeight?: number;
    colorPalette?: ColorPaletteInput;
    valueFmt?: string;
    percentFmt?: string;
    showPercent?: boolean;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface HeatmapProps {
    data: DataRecord[];
    x: string;
    y: string;
    value: string;
    title?: string;
    subtitle?: string;
    legend?: boolean;
    height?: string;
    width?: string;
    chartAreaHeight?: number;
    colorScale?: string | string[];
    xFmt?: string;
    yFmt?: string;
    valueFmt?: string;
    min?: number;
    max?: number;
    nullsZero?: boolean;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface CalendarHeatmapProps {
    data: DataRecord[];
    date: string;
    value: string;
    title?: string;
    subtitle?: string;
    legend?: boolean;
    height?: string;
    width?: string;
    colorScale?: string | string[];
    valueFmt?: string;
    min?: number;
    max?: number;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface SankeyDiagramProps {
    data: DataRecord[];
    source: string;
    target: string;
    value: string;
    title?: string;
    subtitle?: string;
    height?: string;
    width?: string;
    chartAreaHeight?: number;
    colorPalette?: ColorPaletteInput;
    valueFmt?: string;
    orient?: 'horizontal' | 'vertical';
    nodeWidth?: number;
    nodeGap?: number;
    nodeAlign?: 'left' | 'right' | 'justify';
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface USMapProps {
    data: DataRecord[];
    state: string;
    value: string;
    title?: string;
    subtitle?: string;
    legend?: boolean;
    height?: string;
    width?: string;
    colorScale?: string | string[];
    valueFmt?: string;
    min?: number;
    max?: number;
    link?: string;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface AreaMapProps {
    data: DataRecord[];
    areaCol: string;
    geoJsonUrl: string;
    geoId?: string;
    value: string;
    title?: string;
    subtitle?: string;
    legend?: boolean;
    height?: string;
    width?: string;
    colorScale?: string | string[];
    valueFmt?: string;
    min?: number;
    max?: number;
    link?: string;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface PointMapProps {
    data: DataRecord[];
    lat: string;
    long: string;
    value?: string;
    name?: string;
    title?: string;
    subtitle?: string;
    height?: string;
    width?: string;
    basemap?: string;
    pointColor?: ColorInput;
    pointOpacity?: number;
    pointSize?: number;
    valueFmt?: string;
    link?: string;
    echartsOptions?: EChartsOption;
    renderer?: ChartRenderer;
    downloadableData?: boolean;
    downloadableImage?: boolean;
}
export interface BubbleMapProps extends PointMapProps {
    size: string;
    sizeFmt?: string;
    minSize?: number;
    maxSize?: number;
}
export interface ReferenceLineProps {
    y?: number;
    x?: string | number;
    label?: string;
    labelPosition?: 'start' | 'middle' | 'end';
    color?: ColorInput;
    lineType?: LineType;
    lineWidth?: number;
    hideValue?: boolean;
    labelColor?: ColorInput;
    labelBackgroundColor?: ColorInput;
    labelPadding?: number;
    fontSize?: number;
}
export interface ReferenceAreaProps {
    xMin?: string | number;
    xMax?: string | number;
    yMin?: number;
    yMax?: number;
    label?: string;
    color?: ColorInput;
    opacity?: number;
    labelColor?: ColorInput;
    border?: boolean;
    borderColor?: ColorInput;
    borderType?: LineType;
    borderWidth?: number;
}
export interface ReferencePointProps {
    x: string | number;
    y: number;
    label?: string;
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    color?: ColorInput;
    symbol?: MarkerShape;
    symbolSize?: number;
    labelColor?: ColorInput;
    labelBackgroundColor?: ColorInput;
    labelPadding?: number;
    fontSize?: number;
}
export interface SeriesConfig {
    name: string;
    data: unknown[][];
    yAxisIndex: number;
    type?: 'line' | 'bar' | 'scatter' | 'pie' | 'boxplot' | 'heatmap' | 'funnel' | 'sankey' | 'map' | 'effectScatter';
    stack?: string;
    areaStyle?: Record<string, unknown>;
    lineStyle?: Record<string, unknown>;
    itemStyle?: Record<string, unknown>;
    label?: Record<string, unknown>;
    emphasis?: Record<string, unknown>;
    markLine?: Record<string, unknown>;
    markArea?: Record<string, unknown>;
    markPoint?: Record<string, unknown>;
    seriesType?: string;
    [key: string]: unknown;
}
export interface ChartContext {
    data: DataRecord[];
    x?: string;
    y?: string | string[];
    y2?: string | string[];
    series?: string;
    swapXY: boolean;
    xType: XAxisType;
    xFormat?: object;
    yFormat?: object;
    y2Format?: object;
    sizeFormat?: object;
    xMismatch: boolean;
    columnSummary: Record<string, unknown>;
    xAxisTitle?: string;
    yAxisTitle?: string;
    y2AxisTitle?: string;
    tooltipTitle?: string;
    chartAreaHeight?: number;
    chartType: string;
    yCount: number;
    y2Count: number;
}
export interface EChartsActionOptions extends EChartsOption {
    dispatch?: (event: string, params: unknown) => void;
    showAllXAxisLabels?: boolean;
    theme: 'light' | 'dark';
    connectGroup?: string;
    seriesColors?: Record<string, string>;
    echartsOptions?: EChartsOption;
    seriesOptions?: Record<string, unknown>;
    renderer?: ChartRenderer;
    swapXY?: boolean;
    xAxisLabelOverflow?: 'break' | 'truncate';
    config?: EChartsOption;
}
