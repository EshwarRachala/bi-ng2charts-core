import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ChartComponent } from '../chart.component';

@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: any;
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
        this.chart.xAxis(changes.data, this.xScale);
        this.chart.yAxis(changes.data, this.yScale);
        this.chart.Bar(changes.data, this.xScale, this.yScale);

    }

    ngAfterViewInit() {
        this.chart = new ChartComponent(this.target.nativeElement, this.settings)

        this.xScale = this.chart.xScale();
        this.yScale = this.chart.yScale();

        this.svg = this.chart.SVG();

        this.chart.xAxis(this.data, this.xScale);
        this.chart.yAxis(this.data, this.yScale);

        this.chart.Bar(this.data, this.xScale, this.yScale);
    }
}


