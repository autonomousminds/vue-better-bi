import { BubbleChartProps } from '../../types';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<BubbleChartProps>, {
    pointOpacity: number;
    minSize: number;
    maxSize: number;
    outlineWidth: number;
    xBaseline: boolean;
    yGridlines: boolean;
    xAxisLabels: boolean;
    yAxisLabels: boolean;
    downloadableData: boolean;
    downloadableImage: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (params: unknown) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<BubbleChartProps>, {
    pointOpacity: number;
    minSize: number;
    maxSize: number;
    outlineWidth: number;
    xBaseline: boolean;
    yGridlines: boolean;
    xAxisLabels: boolean;
    yAxisLabels: boolean;
    downloadableData: boolean;
    downloadableImage: boolean;
}>>> & Readonly<{
    onClick?: ((params: unknown) => any) | undefined;
}>, {
    downloadableData: boolean;
    downloadableImage: boolean;
    xBaseline: boolean;
    xAxisLabels: boolean;
    yGridlines: boolean;
    yAxisLabels: boolean;
    outlineWidth: number;
    pointOpacity: number;
    minSize: number;
    maxSize: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
