import * as d3 from 'd3';

export class BubblesComponent {
    target: HTMLElement;
    constructor(target: HTMLElement) {
        this.target = target;
    }

    render(values: number[]) {
        d3.select(this.target)
            .selectAll('circle')
            .data(values)
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

    destroy() {
    }
}
