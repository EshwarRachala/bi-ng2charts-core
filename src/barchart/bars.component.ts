import * as d3 from 'd3';

export class BarsComponent {
    target: HTMLElement;
    width: any;
    height: any;
    margin: any;

    constructor(target: HTMLElement, width: any,
        height: any, margin: any) {
        this.target = target;
        this.width = width - margin.left - margin.right;
        this.height = height - margin.top - margin.bottom;
        this.margin = margin;
    }

    xScale(data: any[]): any {
        let xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.age)])
            .range([0, this.width])
            .nice();
        return xScale;
    }

    yScale(data: any[]): any {
        let yScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([this.height, 0])
            .padding(0.1);

        return yScale;
    }

    render(data: any[]) {

        let x = this.xScale(data);
        let y = this.yScale(data);

        const svg = d3.select(this.target)
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.left + this.margin.right);

        const g = svg.append('g')
            .attr('transform',
            `translate(${this.margin.left},${this.margin.right})`);


        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${this.height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .style('font-size', '12px')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

        g.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(y))
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
            .attr('y', d => y(d.name))
            .attr('height', y.bandwidth())
            .attr('width', d => x(d.age));
    }

    destroy() {
    }
}
