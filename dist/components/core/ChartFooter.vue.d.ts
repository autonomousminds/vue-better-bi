import { EChartsOption } from 'echarts';
import { DataRecord, Appearance } from '../../types';

interface Props {
    config: EChartsOption;
    data?: DataRecord[];
    queryId?: string;
    chartTitle?: string;
    theme?: Appearance;
    seriesColors?: Record<string, string>;
    echartsOptions?: EChartsOption;
    seriesOptions?: Record<string, unknown>;
    downloadableData?: boolean;
    downloadableImage?: boolean;
    visible?: boolean;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    downloadableData: boolean;
    downloadableImage: boolean;
    visible: boolean;
    theme: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    downloadableData: boolean;
    downloadableImage: boolean;
    visible: boolean;
    theme: string;
}>>> & Readonly<{}>, {
    theme: Appearance;
    downloadableData: boolean;
    downloadableImage: boolean;
    visible: boolean;
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
