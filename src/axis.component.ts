import { Input } from '@angular/core';
import * as d3 from "d3";

export interface IAxis<T> {
    xAxis(data: any, svg: any, xscale: any): T;
    yAxis(data: any, svg: any, xscale: any): T;
}

export class ScaleComponent implements IAxis<any> {

    @Input() width: any;
    @Input() height: any;
    
    scale: any;

    constructor(width: any, height: any) {
        this.width = width;
        this.height = height;
    }

    xScale(): any {
        this.scale = d3.scaleLinear().range([0, this.width]);
        return this.scale;
    }

    yScale(): any {
        this.scale = d3.scaleBand().range([this.height, 0]);
        return this.scale;
    }

    xAxis(data: any, svg: any, xscale: any): void {

        let x = xscale.domain([0, d3.max(data, (d: any) => d.value)]);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');
    }

    yAxis(data: any) {
        throw new Error('Method not implemented.');
    }
}
