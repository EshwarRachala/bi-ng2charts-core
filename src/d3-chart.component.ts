import * as d3 from "d3";
import { ScaleType, Axis } from './enums';

export class Chart {
    private svg: any;
    private width: any;
    private height: any;
    private margin: any;
    htmlElement: HTMLElement;
    private x: any = d3.scaleLinear();
    private y: any = d3.scaleLinear();
    private xValue: any;
    private yValue: any;


    constructor(public element: HTMLElement) {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.htmlElement = element;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
    }

    createsvg() {
        this.svg = d3.select(this.htmlElement)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this;
    }

    public xScale(type: ScaleType) {
        //   debugger;
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

    public yScale(type: ScaleType) {
        //   debugger;
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

    public domain(axis: Axis) {

        switch (axis) {
            case Axis.x:
                this.x.domain([0, this.xValue]);
                break;
            case Axis.y:
                this.y.domain(this.yValue);
                break;
        }

        return this;
    }

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

    public Bar(data: any) {
        this.svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: any) => this.y(d.text))
            .attr('height', this.y.bandwidth())
            .attr('width', (d: any) => this.x(d.value));
    }

    public dataMap(data: any[], axis: Axis) {

        switch (axis) {
            case Axis.x:
                this.xValue = data.map((d: any) => d.text);
                break;
            case Axis.y:
                this.yValue = data.map((d: any) => d.text);
                break;
        }

        return this;
    }

    public Max(data: any, axis: Axis) {

        switch (axis) {
            case Axis.x:
                this.xValue = d3.max(data, (d: any) => d.value)
                break;
            case Axis.y:
                this.yValue = d3.max(data, (d: any) => d.value)
                break;
        }

        return this;
    }
}
