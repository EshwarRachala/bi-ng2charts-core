import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis, Value } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    providers: [ChartService]
})

export class LineChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any = {};
    @Input() data: Array<{ text: string, value: number }>;
    @ViewChild('target') target: any;

    public chart: ChartService;
    private d3: any;

    constructor(chartService: ChartService) {
        this.chart = chartService;
        this.d3 = this.chart.D3Module();
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
            .Extent(data, Axis.x, Value.text)
            .xAxis()
            .yScale(ScaleType.Linear)
            .range(Axis.y)
            .Max(data, Axis.y, Value.value)
            .yAxis()
            .Line(data, Value.text, Value.value);
    }
}
