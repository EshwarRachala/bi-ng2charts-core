import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { ScaleType, Axis, ValueType } from './enums';


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

    private htmlElement: HTMLElement;
    private xscale: any = d3.scaleLinear();
    private yscale: any = d3.scaleLinear();

    private xvalue: any;
    private yvalue: any;

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
    public XScale(type: ScaleType) {

        switch (type) {
            case ScaleType.Linear:
                this.xscale = d3.scaleLinear();
                break;
            case ScaleType.Band:
                this.xscale = d3.scaleBand();
                break;
            case ScaleType.Time:
                this.xscale = d3.scaleTime();
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
    public YScale(type: ScaleType) {

        switch (type) {
            case ScaleType.Linear:
                this.yscale = d3.scaleLinear();
                break;
            case ScaleType.Band:
                this.yscale = d3.scaleBand().padding(0.1);
                break;
            case ScaleType.Time:
                this.yscale = d3.scaleTime();
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
    public Range(axis: Axis) {

        switch (axis) {
            case Axis.x:
                this.xscale.range([0, this.width]);
                break;
            case Axis.y:
                this.yscale.range([this.height, 0]);
                break;
        }

        return this;
    }

    public RangeRound(axis: Axis) {

        switch (axis) {
            case Axis.x:
                this.xscale.rangeRound([0, this.width]);
                break;
            case Axis.y:
                this.yscale.rangeRound([this.height, 0]);
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
    public XAxis() {
        this.svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(this.xscale))
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
    public YAxis() {

        this.svg
            .append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(this.yscale))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        return this;
    }

    public Bar(data: any, xval: ValueType, yval: ValueType) {

        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this.yscale(
                (yval === ValueType.text) ? d.text : d.value
            ))
            .attr('height', this.yscale.bandwidth())
            .attr('width', (d: any) => this.xscale(
                (xval === ValueType.text) ? d.text : d.value
            ));

        return this;
    }


    public Line(data: any[], xval: ValueType, yval: ValueType) {

        const line = d3.line()
            .x((d: any) => this.xscale(
                (xval === ValueType.text) ? d.text : d.value))
            .y((d: any) => this.yscale(
                (yval === ValueType.text) ? d.text : d.value));

        this.svg
            .append('path')
            .data([data])
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr('d', line);

        return this;
    }

    public Map(data: any[], axis: Axis, val: ValueType) {

        switch (axis) {
            case Axis.x:
                this.xvalue = data.map((d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.xscale.domain(this.xvalue);

                break;

            case Axis.y:
                this.yvalue = data.map((d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.yscale.domain(this.yvalue);

                break;
        }

        return this;
    }

    public Extent(data: any[], axis: Axis, val: ValueType) {

        switch (axis) {
            case Axis.x:
                this.xvalue = d3.extent(data, (d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.xscale.domain(this.xvalue);
                break;

            case Axis.y:
                this.yvalue = d3.extent(data, (d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.yscale.domain(this.yvalue);
                break;

        }

        return this;
    }

    public Max(data: any, axis: Axis, val: ValueType) {

        switch (axis) {
            case Axis.x:
                this.xvalue = d3.max(data, (d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.xscale.domain([0, this.xvalue]);
                break;

            case Axis.y:
                this.yvalue = d3.max(data, (d: any) =>
                    (val === ValueType.text) ? d.text : d.value);
                this.yscale.domain([0, this.yvalue]);
                break;
        }

        return this;
    }
}
