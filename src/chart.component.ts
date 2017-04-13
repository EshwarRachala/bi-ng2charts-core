import { Input } from '@angular/core';
import * as d3 from "d3";
import { ScaleType } from './enums';

export interface IChart<T> {
    SVG(): T;
    xScale(type: ScaleType): T;
    yScale(type: ScaleType): T;
    xAxis(data: any, scale: any): T;
    yAxis(data: any, scale: any): T;
    Bar(data: any, xScale: any, yScale: any): T;
}

export class ChartComponent implements IChart<any> {

    @Input() host: any;
    private width: any;
    private height: any;
    private svg: any;
    private margin: any;
    htmlElement: HTMLElement;
    private axis: any;

    constructor(public element: HTMLElement) {
        //   this.settings = settings;
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.htmlElement = element;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
    }

    SVG(): any {
        // console.log('came to svg component');
        this.host = d3.select(this.htmlElement);
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this.svg;
    }

    xScale(type: ScaleType): any {

        switch (type) {
            case ScaleType.Linear:
                return d3.scaleLinear().range([0, this.width]);
            case ScaleType.Band:
                return d3.scaleBand().range([0, this.width]);
            case ScaleType.Time:
                return d3.scaleTime().range([0, this.width]);
        }
    }

    yScale(type: ScaleType): any {

        switch (type) {
            case ScaleType.Linear:
                return d3.scaleLinear().range([this.height, 0]);
            case ScaleType.Band:
                return d3.scaleBand().range([this.height, 0])
                    .padding(0.1);
            case ScaleType.Time:
                return d3.scaleTime().range([this.height, 0]);
        }
    }

    xAxis(data: any, scale: any): void {

        const axis = scale.domain([0,
            d3.max(data, (d: any) => d.value)]);

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(axis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    yAxis(data: any, scale: any): void {

        const axis = scale.domain(data.map((d: any) => d.text));

        this.svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(axis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    Bar(data: any, xScale: any, yScale: any) {
        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', 'steelblue')
            .attr('y', (d: any) => yScale(d.text))
            .attr('height', yScale.bandwidth())
            .attr('width', (d: any) => xScale(d.value));
    }
}





