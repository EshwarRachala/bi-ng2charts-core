import * as d3 from 'd3';

export class BarsComponent {
    target: HTMLElement;
    width: number;
    height: number;
    margin: any;

    constructor(target: HTMLElement, width: number,
        height: number, margin: any) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.margin = margin;
    }

    render(data: any[]) {
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[0])])
            .range([0, this.width])
            .nice();

        let yScale = d3.scaleBand()
            .domain(data.map(d => d[1]))
            .range([this.height, 0])
            .padding(0.1);

        const svg = d3.select(this.target);

        const g = svg.append('g')
            .attr('transform',
            `translate(${this.margin.left},${this.margin.right})`);


        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        g.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', d => yScale(d[1]))
            .attr('height', yScale.bandwidth())
            .attr('width', d => xScale(d[0]));
    }

    destroy() {
    }
}
