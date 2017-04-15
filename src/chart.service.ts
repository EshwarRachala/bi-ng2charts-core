import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { ScaleType, Axis, Value } from './enums';


/**
 * 
 * 
 * @export
 * @class ChartService
 */
@Injectable()
export class ChartService {
    private svg: any;
    private width: any;
    private height: any;
    private margin: any;
    htmlElement: HTMLElement;
    private x: any = d3.scaleLinear();
    private y: any = d3.scaleLinear();
    private xValue: any;
    private yValue: any;

    /**
     * Creates an instance of ChartService.
     * 
     * @memberOf ChartService
     */
    constructor() {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
    }

    /**
     * 
     * 
     * @returns d3 Core modules 
     * this can be used to export default modules 
     * @memberOf ChartService
     */
    public D3Module() {
        return d3;
    }

    /**
     * 
     * 
     * @param {*} element 
     * @returns 
     * 
     * @memberOf ChartService
     */
    createsvg(element: any) {

        this.htmlElement = element;
        this.width = this.htmlElement.clientWidth -
            this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 -
            this.margin.top - this.margin.bottom;

        this.svg = d3.select(this.htmlElement)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this;
    }

    /**
     * 
     * 
     * @param {ScaleType} type 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public xScale(type: ScaleType) {
        switch (type) {
            case ScaleType.Linear:
                this.x = d3.scaleLinear();
                break;
            case ScaleType.Band:
                this.x = d3.scaleBand();
                break;
            case ScaleType.Time:
                this.x = d3.scaleTime();
                break;
        }

        return this;
    }

    /**
     * 
     * 
     * @param {ScaleType} type 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public yScale(type: ScaleType) {

        switch (type) {

            case ScaleType.Linear:
                this.y = d3.scaleLinear();
                break;
            case ScaleType.Band:
                this.y = d3.scaleBand().padding(0.1);
                break;
            case ScaleType.Time:
                this.y = d3.scaleTime();
                break;
        }

        return this;
    }

    /**
     * 
     * 
     * @param {Axis} axis 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public range(axis: Axis) {

        switch (axis) {

            case Axis.x:
                this.x.range([0, this.width]);
                break;

            case Axis.y:
                this.y.range([this.height, 0]);
                break;
        }

        return this;
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public xAxis() {
        this.svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(this.x))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        return this;
    }

    /**
     * 
     * 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public yAxis() {

        this.svg
            .append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(this.y))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        return this;
    }

    public Bar(data: any, xval: Value, yval: Value) {

        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this.y(
                (yval === Value.text) ? d.text : d.value
            ))
            .attr('height', this.y.bandwidth())
            .attr('width', (d: any) => this.x(
                (xval === Value.text) ? d.text : d.value
            ));

        return this;
    }


    public Line(data: any, xval: Value, yval: Value) {

        const line = d3.line()
            .x((d: any) => this.x((xval === Value.text) ? d.text : d.value))
            .y((d: any) => this.y((yval === Value.text) ? d.text : d.value));

        this.svg
            .append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line);

        return this;
    }

    public Map(data: any[], axis: Axis, val: Value) {

        switch (axis) {

            case Axis.x:
                this.xValue = data.map((d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.x.domain(this.xValue);
                break;

            case Axis.y:
                this.yValue = data.map((d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.y.domain(this.yValue);
                break;
        }

        return this;
    }

    public Extent(data: any[], axis: Axis, val: Value) {

        debugger;

        switch (axis) {

            case Axis.x:
                this.xValue = d3.extent(data, (d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.x.domain(this.xValue);
                break;

            case Axis.y:
                this.yValue = d3.extent(data, (d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.y.domain(this.yValue);
                break;

        }

        return this;
    }

    public Max(data: any, axis: Axis, val: Value) {

        switch (axis) {
            case Axis.x:
                this.xValue = d3.max(data, (d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.x.domain([0, this.xValue]);
                break;
            case Axis.y:
                this.yValue = d3.max(data, (d: any) =>
                    (val === Value.text) ? d.text : d.value);
                this.y.domain([0, this.yValue]);
                break;
        }

        return this;
    }
}
