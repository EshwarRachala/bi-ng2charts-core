export interface ChartConfig {
    settings: { width: number, height: number, margin: any };
    dataset: Array<{ x: string, y: number }>
}
