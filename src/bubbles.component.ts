import * as d3 from 'd3';

// Exports the visualization module
export class BubblesComponent {
    target: HTMLElement;
    constructor(target: HTMLElement) {
        this.target = target;
    }

    render(values: number[]) {
        d3.select(this.target)
            // Get the old circles
            .selectAll('circle')
            .data(values)
            .enter()
            // For each new data point, append a circle to the target SVG
            .append('circle')
            // Apply several style attributes to the circle
            .attr('r', (d: any) => Math.log(d))
            .attr('fill', '#5fc')
            .attr('stroke', '#333')
            .attr('transform', (d: any, i: number) => {
                // This moves the circle based on its value
                var offset = i * 20 + 2 * Math.log(d);
                return `translate(${offset}, ${offset})`;
            });
    }

    destroy() {
    }
}
