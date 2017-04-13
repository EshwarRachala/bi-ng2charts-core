import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ChartComponent } from '../chart.component';
import { ScaleType } from '../enums';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any = {};
    @Input() data: Array<{ text: string, value: number }>;
    @ViewChild('target') target: any;

    private svg: any;
    private xScale: any;
    private yScale: any;

    private chart: ChartComponent;

    constructor() { }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!this.settings || !changes.data || !this.svg) return;

        this.chart.xAxis(this.chart.max(changes.data), this.xScale);
        this.chart.yAxis(this.chart.map(changes.data), this.yScale);

        this.chart.Bar(changes.data, this.xScale, this.yScale);
    }

    ngAfterViewInit() {
        this.chart = new ChartComponent(this.target.nativeElement);

        this.xScale = this.chart.xScale(ScaleType.Linear);
        this.yScale = this.chart.yScale(ScaleType.Band);

        this.svg = this.chart.SVG();

        this.chart.xAxis(this.chart.max(this.data), this.xScale);
        this.chart.yAxis(this.chart.map(this.data), this.yScale);

        this.chart.Bar(this.data, this.xScale, this.yScale);

    }

}
