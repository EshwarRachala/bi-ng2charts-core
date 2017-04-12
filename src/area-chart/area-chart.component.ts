import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { ChartConfig } from './chart-config.component';
import * as d3 from 'd3';

@Component({
    selector: 'area-chart',
    templateUrl: './area-chart.component.html',
    styleUrls: ['./area-chart.component.css']
})

export class AreaChartComponent implements OnChanges, AfterViewInit {

    @Input() config: ChartConfig;
    @ViewChild('target') target: any;

    private host: any;
    private svg: any;
    private margin: any;
    private width: any;
    private height: any;
    private xScale: any;
    private yScale: any;
    private xAxis: any;
    private yAxis: any;
    private htmlElement: HTMLElement;

    constructor() { }

    ngOnChanges(changes: any): void {
        // tslint:disable-next-line:curly
        if (!this.config || !this.host) return;
        this.setup();
        this.buildSVG();
        this.drawXAxis();
        this.drawYAxis();
        this.render();
    }

    ngAfterViewInit() {
        debugger;
        this.htmlElement = this.target.nativeElement;
        this.host = d3.select(this.htmlElement);
        this.setup();
        this.buildSVG();
        this.drawXAxis();
        this.drawYAxis();
        this.render();

    }

    private setup(): void {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.yScale = d3.scaleBand().range([this.height, 0]);
    }

    private buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        this.svg.attr('fill', 'red');
    }

    private drawXAxis(): void {
        this.xAxis = this.xScale
            .domain([0, d3.max(this.config.dataset,
                (d: any) => d.value)]);

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(this.xAxis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    private drawYAxis(): void {

        this.yAxis = this.yScale
            .domain(this.config.dataset.map(d => d.text))
            .range([this.height, 0])
            .padding(0.1);

        this.svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(this.yAxis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    private render(): void {

        this.svg.selectAll('.bar')
            .data(this.config.dataset)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d:any) => this.yScale(d.text))
            .attr('height', this.yScale.bandwidth())
            .attr('width', (d:any) => this.xScale(d.value));

    }

}


