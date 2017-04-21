import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis, DataType } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    providers: [ChartService]
})

export class LineChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: { fill: string };
    @Input() data: Array<DataType>;
    @ViewChild('target') target: any;

    public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!changes.data) return;
        this.data = changes.data.currentValue;

        const format = this.chart._d3.timeParse("%d-%b-%y");

        this.data.forEach((d: any) => {
            d.text = format(d.text);
            d.value = +d.value;
        });

        this.render(this.data);
    }

    ngAfterViewInit() {

    }

    render(data: Array<DataType>) {
        const d3 = this.chart._d3;

        const line = d3.line<DataType>()
            .x(d => this.chart._xscale(d.text))
            .y(d => this.chart._yscale(d.value));

        
        this.chart
            .Svg(this.target.nativeElement)
            .scale(ScaleType.Time, Axis.x)
            .rangeRound(Axis.x)
            .domain(Axis.x, d3.extent<DataType>(data, d => d.text))
            .axis(Axis.x)
            .scale(ScaleType.Linear, Axis.y)
            .rangeRound(Axis.y)
            .domain(Axis.y, d3.extent<DataType>(data, d => d.value))
            .axis(Axis.y)
            .line(data, line);

    }
}
