import { Input } from '@angular/core';
import * as d3 from "d3";
import { ScaleType } from './enums';

/**
 * 
 * 
 * @export
 * @interface IChart
 * @template T 
 */
export interface IChart<T> {
    SVG(): T;
    xScale(type: ScaleType): T;
    yScale(type: ScaleType): T;
    extent(data: any): T;
    map(data: any): T;
    max(data: any): T;
    parseTime(data: any): T;
    xAxis(value: any, scale: any): T;
    yAxis(value: any, scale: any): T;
    Bar(data: any, xScale: any, yScale: any): T;
}

/**
 * 
 * 
 * @export
 * @class ChartComponent
 * @implements {IChart<any>}
 */
export class ChartComponent implements IChart<any> {

    @Input() host: any;
    private width: any;
    private height: any;
    private svg: any;
    private margin: any;
    htmlElement: HTMLElement;

    /**
     * Creates an instance of ChartComponent.
     * @param {HTMLElement} element 
     * 
     * @memberOf ChartComponent
     */
    constructor(public element: HTMLElement) {
        //   this.settings = settings;
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.htmlElement = element;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
    }

    /**
     * 
     * 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
    SVG(): any {
        this.host = d3.select(this.htmlElement);
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this.svg;
    }

    /**
     * 
     * 
     * @param {ScaleType} type 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
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

    /**
     * 
     * 
     * @param {ScaleType} type 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
    yScale(type: ScaleType): any {

        switch (type) {
            case ScaleType.Linear:
                return d3.scaleLinear().range([this.height, 0]);
            case ScaleType.Band:
                return d3.scaleBand().range([this.height, 0]).padding(0.1);
            case ScaleType.Time:
                return d3.scaleTime().range([this.height, 0]);
        }
    }

    /**
     * 
     * 
     * @param {*} data 
     * @param {*} scale 
     * 
     * @memberOf ChartComponent
     */
    xAxis(value: any, scale: any): void {

        const axis = scale.domain([0, value]);

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

    /**
     * 
     * 
     * @param {*} data 
     * @param {*} scale 
     * 
     * @memberOf ChartComponent
     */
    yAxis(value: any, scale: any): void {
        const axis = scale.domain(value);

        this.svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(axis))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    /**
     * 
     * 
     * @param {*} data 
     * @param {*} xScale 
     * @param {*} yScale 
     * 
     * @memberOf ChartComponent
     */
    Bar(data: any, xScale: any, yScale: any) {
        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => yScale(d.text))
            .attr('height', yScale.bandwidth())
            .attr('width', (d: any) => xScale(d.value));
    }

    Line(data: any, xScale: any, yScale: any) {

        let line = d3.line()
            .x((d: any) => xScale(d.date))
            .y((d: any) => yScale(d.price));

        this.svg
            .append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);

    }

    /** 
     * 
     * 
     * @param {*} data 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
    extent(data: any): any {
        return d3.extent(data, (d: any) => d.text);
    }

    /**
     * 
     * 
     * @param {*} data 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
    map(data: any): any {
        return data.map((d: any) => d.text);
    }

    /**
     * 
     * 
     * @param {*} data 
     * @returns {*} 
     * 
     * @memberOf ChartComponent
     */
    max(data: any): any {
        return d3.max(data, (d: any) => d.value);
    }

    parseTime(data: any, format = "%d-%b-%y") {
        return d3.timeParse(format);
    }

}





