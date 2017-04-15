# ng2Charts

This Library provides two different types of d3 charts
either we can use Basic charts(ex: BarChart, LineChart etc.) by using Angular module(`ChartsModule`)
or
we can use Angular 2 service (`ChartService`) which exposes d34.7 module along 
with Angular 2 predefined d3 functions 


## Import Library

Run `npm install ng2charts`
and `import {ChartsModule, ChartService } from 'ng2charts'`


## Utilizing Chart components

`<bar-chart [settings]="settings" [data]="dataset"></bar-chart>`

## Utilizing ChartService

import Service 

```js

import {ChartsModule, ChartService } from 'ng2charts'


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})

 public chart: ChartService;
    private d3: any;

    constructor(chartService: ChartService) {
        this.chart = chartService;
        this.d3 = this.chart.D3Module();
    }

   this.chart
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
```

### for more details reference bar-chart component in src folder

### to resolve d3 Install typings (add --g to install globally)
`typings install  --save dt~d3;`


