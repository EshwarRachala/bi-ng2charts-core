import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ContainerElement } from '@types/d3-selection';


@Injectable()
export class SvgService {
    private _svg: d3.Selection<ContainerElement, any, any, any>;
    public width: number;
    public height: number;
    public margin: { top: number; right: number; bottom: number; left: number; };

    constructor() { }

    public svg(htmlElement: ContainerElement): d3.Selection<ContainerElement, any, any, any> {

        this.width = htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;

        this._svg = d3.select(htmlElement);
        this._svg.html('');

        this._svg
            .append<ContainerElement>('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this._svg;
    }
}
