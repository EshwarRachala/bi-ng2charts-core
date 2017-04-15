import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis, Value } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})

export class BarChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any = {};
    @Input() data: Array<{ text: string, value: number }>;
    @ViewChild('target') target: any;

    public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!changes.data) return;
        this.data = changes.data.currentValue;
        this.render(this.data);
    }

    ngAfterViewInit() {
    }

    render(data: any) {

        this.chart
            .createsvg(this.target.nativeElement)
            .xScale(ScaleType.Linear)
            .range(Axis.x)
            .Max(data, Axis.x, Value.value)
            .xAxis()
            .yScale(ScaleType.Band)
            .range(Axis.y)
            .Map(data, Axis.y, Value.text)
            .yAxis()
            .Bar(data, Value.value, Value.text);
    }
}
