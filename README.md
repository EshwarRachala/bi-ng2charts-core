# ng2charts
Angular d3 chart components

## Import Library

install from npm 
`npm install ng2charts`

once installed 

`import { ChartsModule, ChartService } from 'ng2charts';`

Using bar chart

`<bar-chart [settings]="settings" [data]="dataset"></bar-chart>`


Creating Charts using ChartService

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

`  this.chart
            .createsvg(this.target.nativeElement)
            .XScale(ScaleType.Time)
            .RangeRound(Axis.x)
            .Extent(data, Axis.x, ValueType.text)
            .XAxis()
            .YScale(ScaleType.Linear)
            .RangeRound(Axis.y)
            .Extent(data, Axis.y, ValueType.value)
            .YAxis()
            .Line(data, ValueType.text, ValueType.value);
`

### for more details reference bar-chart component in src folder

### to resolve d3 Install typings (add --g to install globally)
`typings install  --save dt~d3;`


