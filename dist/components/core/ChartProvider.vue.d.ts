import { EChartsOption } from 'echarts';

interface Props {
    data?: Record<string, unknown>[];
    x?: string;
    y?: string | string[];
    y2?: string | string[];
    series?: string;
    swapXY?: boolean;
    xType?: 'category' | 'value' | 'time';
    xFormat?: object;
    yFormat?: object;
    y2Format?: object;
    sizeFormat?: object;
    xMismatch?: boolean;
    columnSummary?: Record<string, unknown>;
    xAxisTitle?: string;
    yAxisTitle?: string;
    y2AxisTitle?: string;
    tooltipTitle?: string;
    chartAreaHeight?: number;
    chartType?: string;
    yCount?: number;
    y2Count?: number;
}
declare function __VLS_template(): {
    default?(_: {
        context: {
            data: import('../..').DataRecord[];
            x?: string | undefined;
            y?: string | string[] | undefined;
            y2?: string | string[] | undefined;
            series?: string | undefined;
            swapXY: boolean;
            xType: import('../..').XAxisType;
            xFormat?: object | undefined;
            yFormat?: object | undefined;
            y2Format?: object | undefined;
            sizeFormat?: object | undefined;
            xMismatch: boolean;
            columnSummary: Record<string, unknown>;
            xAxisTitle?: string | undefined;
            yAxisTitle?: string | undefined;
            y2AxisTitle?: string | undefined;
            tooltipTitle?: string | undefined;
            chartAreaHeight?: number | undefined;
            chartType: string;
            yCount: number;
            y2Count: number;
        };
        config: Record<string, unknown>;
        theme: import('../..').UseThemeReturn;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    data: () => never[];
    swapXY: boolean;
    xType: string;
    xMismatch: boolean;
    chartType: string;
    yCount: number;
    y2Count: number;
}>>, {
    chartContext: {
        data: import('../..').DataRecord[];
        x?: string | undefined;
        y?: string | string[] | undefined;
        y2?: string | string[] | undefined;
        series?: string | undefined;
        swapXY: boolean;
        xType: import('../..').XAxisType;
        xFormat?: object | undefined;
        yFormat?: object | undefined;
        y2Format?: object | undefined;
        sizeFormat?: object | undefined;
        xMismatch: boolean;
        columnSummary: Record<string, unknown>;
        xAxisTitle?: string | undefined;
        yAxisTitle?: string | undefined;
        y2AxisTitle?: string | undefined;
        tooltipTitle?: string | undefined;
        chartAreaHeight?: number | undefined;
        chartType: string;
        yCount: number;
        y2Count: number;
    };
    chartConfig: Record<string, unknown>;
    addSeries: (series: EChartsOption["series"]) => void;
    removeSeries: (name: string) => void;
    updateSeries: (name: string, config: Partial<EChartsOption["series"]>) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    data: () => never[];
    swapXY: boolean;
    xType: string;
    xMismatch: boolean;
    chartType: string;
    yCount: number;
    y2Count: number;
}>>> & Readonly<{}>, {
    data: Record<string, unknown>[];
    swapXY: boolean;
    xType: "category" | "value" | "time";
    yCount: number;
    y2Count: number;
    xMismatch: boolean;
    chartType: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
