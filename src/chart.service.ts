import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ScaleType, Axis, ColName } from './enums';

/**
 * 
 * 
 * @export
 * @class ChartService
 */
@Injectable()
export class ChartService {

    public _d3: typeof d3;
    private _htmlElement: HTMLElement;
    public _svg: d3.Selection<HTMLElement, any, any, any>;
    public _width: number;
    public _height: number;
    public _margin: { top: number; right: number; bottom: number; left: number; };
    public _xscale: any = d3.scaleLinear();
    public _yscale: any = d3.scaleLinear();

    /**
     * Creates an instance of ChartService.
     * 
     * @memberOf ChartService
     */
    constructor() {
        this._margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this._d3 = d3;
    }

    /**
     * 
     * 
     * @param {*} element 
     * @returns 
     * 
     * @memberOf ChartService
     */
    public Svg(element: HTMLElement) {

        this._htmlElement = element;
        this._svg = d3.select(this._htmlElement);
        this._svg.html('');
        this._width = this._htmlElement.clientWidth - this._margin.left - this._margin.right;
        this._height = this._htmlElement.clientWidth * 0.5 - this._margin.top - this._margin.bottom;

        this._svg
            .append('svg')
            .attr('width', this._width + this._margin.left + this._margin.right)
            .attr('height', this._height + this._margin.top + this._margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this._margin.left + ',' + this._margin.top + ')');

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
                this._xscale = scl;
                break;
            case Axis.y:
                this._yscale = scl;
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
                this._xscale.range([0, this._width]);
                break;
            case Axis.y:
                this._yscale.range([this._height, 0]);
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
                this._xscale.rangeRound([0, this._width]);
                break;
            case Axis.y:
                this._yscale.rangeRound([this._height, 0]);
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
                    this._xscale.domain([0, func]);
                    break;

                case Axis.y:
                    this._yscale.domain([0, func]);
                    break;
            }
        } else {
            switch (axis) {
                case Axis.x:
                    this._xscale.domain(func);
                    break;

                case Axis.y:
                    this._yscale.domain(func);
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

        this._svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this._yscale(
                (yval === ColName.text) ? d.text : d.value
            ))
            .attr('height', this._yscale.bandwidth())
            .attr('width', (d: any) => this._xscale(
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

        this._svg
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

                this._svg
                    .append('g')
                    .attr('class', 'x axis')
                    .attr('transform', `translate(0,${this._height})`)
                    .call(d3.axisBottom(this._xscale))
                    .selectAll('text')
                    .style('font-size', '12px')
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em');

                break;

            case Axis.y:

                this._svg
                    .append('g')
                    .attr('class', 'y axis')
                    .call(d3.axisLeft(this._yscale))
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
