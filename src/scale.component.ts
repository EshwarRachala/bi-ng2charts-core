import { Input } from '@angular/core';
import * as d3 from "d3";

export class ScaleComponent {

    @Input() width: any;
    @Input() height: any;

    private scale;

    constructor(width: any, height: any) {
        this.width = width;
        this.height = height;
    }

    linearx(): any {
        this.scale = d3.scaleLinear().range([0, this.width]);
        return this.scale;
    }

    lineary(): any {
        return d3.scaleLinear().range([this.height, 0]);
    }

    bandx(): any {
        return d3.scaleBand().range([0, this.width]);
    }

    bandy(): any {
        return d3.scaleBand().range([this.height, 0]);
    }

    domain(data: any[]): any {
        debugger;
        return this.scale.domain([0, d3.max(data, (d: any) => d.value)])
    }
}
