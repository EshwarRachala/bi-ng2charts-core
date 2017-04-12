import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleComponent } from '../scale.component';

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
    private margin: any;
    private width: any;
    private height: any;
    private xScale: any;
    private yScale: any;
    private htmlElement: HTMLElement;

    private scalecomp: ScaleComponent;

    constructor() { }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!this.settings || !changes.data || !this.svg) return;
        this.data = changes.data;
        this.scalecomp.xAxis(this.data, this.xScale);
        this.scalecomp.yAxis(this.data, this.yScale);
        this.render();
    }

    ngAfterViewInit() {
        this.htmlElement = this.target.nativeElement;
        this.setup();
        this.scalecomp.xAxis(this.data, this.xScale);
        this.scalecomp.yAxis(this.data, this.yScale);
        this.render();

    }

    private setup(): void {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
        this.scalecomp = new ScaleComponent(this.target.nativeElement)

        this.xScale = this.scalecomp.xScale();
        this.yScale = this.scalecomp.yScale();
        this.svg = this.scalecomp.SVG();
    }

    private render(): void {

        this.svg.selectAll('.bar')
            .data(this.data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', this.settings.fill)
            .attr('y', (d: any) => this.yScale(d.text))
            .attr('height', this.yScale.bandwidth())
            .attr('width', (d: any) => this.xScale(d.value));

    }

}


