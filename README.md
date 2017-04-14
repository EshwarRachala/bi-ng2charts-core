# ng2charts
Angular d3 chart components

## Import Library

install from npm 
`npm install ng2charts`

once installed 

`import { ChartsModule, ChartService } from 'ng2charts';`

Using bar chart

'<bar-chart [settings]="settings" [data]="dataset"></bar-chart>`


Creating Charts using Service

@Inject chart service

`@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})` 

`public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }'


Render chart 

` render(data: any) {
        this.chart
            .createsvg(this.target.nativeElement)
            .xScale(ScaleType.Linear)
            .range(Axis.x)
            .Max(data, Axis.x)
            .xAxis()
            .yScale(ScaleType.Band)
            .range(Axis.y)
            .Map(data, Axis.y)
            .yAxis()
            .Bar(data);
    }`
## to resolve d3 we need to Install typings add --g to install globally
`typings install  --save dt~d3;`


