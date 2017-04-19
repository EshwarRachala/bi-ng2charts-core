import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ScaleType, Axis, ColName } from './enums';
import { ContainerElement } from "@types/d3-selection";

/**
 * 
 * 
 * @export
 * @class ChartService
 */
@Injectable()
export class ChartService {

    public d3: typeof d3;
    public htmlElement: ContainerElement;
    private host: d3.Selection<ContainerElement, any, any, any>;
    public svg: d3.Selection<ContainerElement, any, any, any>;
    public width: number;
    public height: number;
    public margin: { top: number; right: number; bottom: number; left: number; };
    public xscale: any = d3.scaleLinear();
    public yscale: any = d3.scaleLinear();

    /**
     * Creates an instance of ChartService.
     * 
     * @memberOf ChartService
     */
    constructor() {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.d3 = d3;
    }

    /**
     * 
     * 
     * @param {*} element 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public Svg(element: ContainerElement) {

        this.htmlElement = element;
        this.host = d3.select(this.htmlElement);
        this.host.html('');
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;

        this.host
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        this.svg = this.host;

        return this;
    }

    /**
     * 
     * 
     * @param {ScaleType} type 
     * @param {Axis} axis 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public scale(type: ScaleType, axis: Axis) {

        let scl: any;

        switch (type) {
            case ScaleType.Linear:
                scl = d3.scaleLinear();
                break;
            case ScaleType.Band:
                scl = d3.scaleBand().padding(0.1);
                break;
            case ScaleType.Time:
                scl = d3.scaleTime();
                break;
        }

        switch (axis) {
            case Axis.x:
                this.xscale = scl;
                break;
            case Axis.y:
                this.yscale = scl;
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
                this.xscale.range([0, this.width]);
                break;
            case Axis.y:
                this.yscale.range([this.height, 0]);
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
    public rangeRound(axis: Axis) {

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
     * @param {Axis} axis 
     * @param {*} func 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public domain(axis: Axis, func: any) {
        if (typeof (func) === "number") {
            switch (axis) {
                case Axis.x:
                    this.xscale.domain([0, func]);
                    break;

                case Axis.y:
                    this.yscale.domain([0, func]);
                    break;
            }
        } else {
            switch (axis) {
                case Axis.x:
                    this.xscale.domain(func);
                    break;

                case Axis.y:
                    this.yscale.domain(func);
                    break;

            }
        }

        return this;
    }

    /**
     * 
     * 
     * @param {any[]} data 
     * @param {ColName} xval 
     * @param {ColName} yval 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public bar(data: any[], xval: ColName, yval: ColName) {

        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this.yscale(
                (yval === ColName.text) ? d.text : d.value
            ))
            .attr('height', this.yscale.bandwidth())
            .attr('width', (d: any) => this.xscale(
                (xval === ColName.text) ? d.text : d.value
            ));

        return this;
    }

    /**
     * 
     * 
     * @param {any[]} data 
     * @param {ColName} xval 
     * @param {ColName} yval 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public line(data: any[], line: any) {

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

    /**
     * 
     * 
     * @param {Axis} axis 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public axis(axis: Axis) {
        switch (axis) {
            case Axis.x:

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

                break;

            case Axis.y:

                this.svg
                    .append('g')
                    .attr('class', 'y axis')
                    .call(d3.axisLeft(this.yscale))
                    .selectAll('text')
                    .style('font-size', '12px')
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em');

                break;
        }

        return this;
    }
}
