// Loads some required modules from Angular.
import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
// Loads the code needed to manipulate the visualization 
import * as d3 from 'd3';
// Identifies the class as a component directive that will be associated
// with `bubbles` elements in the DOM, and will include the 
// specified markup as its template
@Component({
    selector: 'bar-chart',
    template: `<svg #target width="300" height="200"></svg>`
})
export class BarChartComponent implements OnChanges, AfterViewInit {
    // Declares values as a data-bound property
    @Input() data: number[];
    // Gets a reference to the child DOM node
    @ViewChild('target') target: any;
    // An instance of the BubblesChart

    // Declares the width of the cheart
    @Input() width: number;

    // Declares the Height of the chart
    @Input() height: number;

    constructor() {
    }

    ngOnChanges(changes: any) {
        this.render(changes.data);
    }

    ngAfterViewInit() {
        this.render(this.data);
    }

    xscale(data: any[]) {
        d3.scaleLinear()
            .domain([0, d3.max(data, d => d[0])])
            .range([0, this.width])
            .nice();
    }

    render(data: any[]) {
        d3.select(this.target.nativeElement)
            .selectAll('circle')
            .data(this.data)
            .enter()
            .append('circle')
            .attr('r', (d: any) => Math.log(d))
            .attr('fill', '#5fc')
            .attr('stroke', '#333')
            .attr('transform', (d: any, i: number) => {
                var offset = i * 20 + 2 * Math.log(d);
                return `translate(${offset}, ${offset})`;
            });
    }



}
