export interface ChartConfig {
    settings: { width: number, height: number, margin: any };
    dataset: Array<{ text: string, value: number }>
}
