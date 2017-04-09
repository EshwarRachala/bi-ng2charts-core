import * as d3 from 'd3';

export class XaxisComponent {

    render(data: any[], height: number, width: number, g: any) {

        let xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[0])])
            .range([0, width])
            .nice();

        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        return g;
    }
}
