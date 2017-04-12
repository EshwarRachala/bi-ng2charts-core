import { Input } from '@angular/core';
import * as d3 from "d3";

export class SvgComponent {
    @Input() host: any;
    private width: any;
    private height: any;
    private svg: any;
    private margin: any;
    private htmlElement: HTMLElement;

    constructor(htmlElement: HTMLElement) {
        this.margin = { top: 20, right: 20, bottom: 70, left: 70 };
        this.htmlElement = htmlElement;
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientWidth * 0.5 - this.margin.top - this.margin.bottom;
    }

    create(): any {
        console.log('came to svg component');
        
        this.host = d3.select(this.htmlElement);

        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' +
            this.margin.left + ',' + this.margin.top + ')');

        return this.svg;
    }

}
