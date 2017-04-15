import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis, ColName } from '../enums';
import { ChartService } from '../chart.service';
import * as d3 from "@types/d3";


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
    d3: typeof d3;

    public chart: ChartService;

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
            .Scale(ScaleType.Linear, Axis.x)
            .Range(Axis.x)
            .MaxFunc(Axis.x, this.d3.max(this.data, (d: any) => d.value))
            .Axis(Axis.x)
            .Scale(ScaleType.Band, Axis.y)
            .Range(Axis.y)
            .MapFunc(Axis.y, data.map((d: any) => d.text))
            //  .Map(data, Axis.y, ColName.text)
            .Axis(Axis.y)
            .Bar(data, ColName.value, ColName.text);


    }
}
