import { Input } from '@angular/core';
import * as d3 from "d3";

export interface IChart<T> {
    SVG(): T;
    xScale(): T;
    yScale(): T;
    xAxis(data: any, svg: any, xscale: any): T;
    yAxis(data: any, svg: any, xscale: any): T;
}

export class ChartComponent implements IChart<any> {

    @Input() host: any;
    private width: any;
    private height: any;
    private svg: any;
    private margin: any;
    private htmlElement: HTMLElement;

    // @Input() width: any;
    // @Input() height: any;
    scale: any;
    axis: any;

    constructor(htmlElement: HTMLElement) {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.htmlElement = htmlElement;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
    }

    SVG(): any {
        console.log('came to svg component');
        this.host = d3.select(this.htmlElement);
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this.svg;
    }

    xScale(): any {
        this.scale = d3.scaleLinear().range([0, this.width]);
        return this.scale;
    }

    yScale(): any {
        this.scale = d3.scaleBand().range([this.height, 0]).padding(0.1);
        return this.scale;
    }

    xAxis(data: any, scale: any): void {

        this.scale = scale;

        this.axis = this.scale.domain([0, d3.max(data, (d: any) => d.value)]);

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(this.axis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    yAxis(data: any, scale: any): void {

        this.scale = scale;

        this.axis = this.scale.domain(data.map((d: any) => d.text));

        this.svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(this.axis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }
}





