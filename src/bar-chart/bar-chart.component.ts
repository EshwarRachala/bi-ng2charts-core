import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis } from '../enums';
import { Chart } from '../d3-chart.component';


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [Chart]
})

export class BarChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any = {};
    @Input() data: Array<{ text: string, value: number }>;
    @ViewChild('target') target: any;

    public chart: Chart;

    constructor(chartService:Chart) {
        this.chart = chartService;
    }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!changes.data) return;
        debugger;
        this.data = changes.data.currentValue;
        //   this.chart = new Chart(this.target.nativeElement);
        console.log(this.data);
        this.render(this.data);
    }

    ngAfterViewInit() {
        //  this.chart = new Chart(this.target.nativeElement);
        //  this.render(this.data);
    }

    render(data: any) {
        debugger;
        this.chart
            .createsvg(this.target.nativeElement)
            .xScale(ScaleType.Linear)
            .range(Axis.x)
            .Max(data, Axis.x)
            .domain(Axis.x)
            .yScale(ScaleType.Band)
            .range(Axis.y)
            .dataMap(data, Axis.y)
            .domain(Axis.y)
            .xAxis()
            .yAxis()
            .Bar(data);
    }
}
