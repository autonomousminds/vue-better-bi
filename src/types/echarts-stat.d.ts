declare module 'echarts-stat' {
  interface HistogramResult {
    data: number[][];
  }

  const ecStat: {
    histogram(
      data: number[],
      method?: 'squareRoot' | 'scott' | 'freedmanDiaconis' | 'sturges'
    ): HistogramResult;
  };

  export default ecStat;
}
