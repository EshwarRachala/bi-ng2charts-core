import * as d3 from 'd3';

export class LinesComponent {
    target: HTMLElement;
    width: any;
    height: any;
    margin: any;
    private totalwidth: any;
    private totalheight: any;

    constructor(target: HTMLElement, width: any,
        height: any, margin: any) {
        this.target = target;
        this.totalwidth = width + margin.left + margin.right;
        this.totalheight = height + margin.left + margin.right;
        this.width = width - margin.left - margin.right;
        this.height = height - margin.top - margin.bottom;
        this.margin = margin;
    }

    render(data: any[]) {
        let xScale = d3.scaleTime()
            .domain([0, d3.max(data, d => d.age)])
            .range([0, this.width])
            .nice();

        let yScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([this.height, 0])
            .padding(0.1);

        const svg = d3.select(this.target)
            .attr('width', this.totalwidth)
            .attr('height', this.totalheight);

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
            .attr('y', d => yScale(d.name))
            .attr('height', yScale.bandwidth())
            .attr('width', d => xScale(d.age));
    }

    destroy() {
    }
}
