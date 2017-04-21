import { Component, Input, OnChanges, AfterViewInit, ViewChild }
    from '@angular/core';
import { ScaleType, Axis, DataType } from '../enums';
import { ChartService } from '../chart.service';


@Component({
    selector: 'bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    providers: [ChartService]
})

export class BarChartComponent implements OnChanges, AfterViewInit {

    @Input() settings: { fill: string };
    @Input() data: Array<DataType>;
    @ViewChild('target') target: any;

    public chart: ChartService;

    constructor(chartService: ChartService) {
        this.chart = chartService;
    }

    ngOnChanges(changes: any): void {
        if (changes.data) {
            this.data = changes.data.currentValue;
            this.render(this.data);
        }
    }

    ngAfterViewInit() {
    }

    render(data: Array<DataType>) {
        debugger;
        // Reference d3 
        const d3 = this.chart._d3;

        this.chart.Svg(this.target.nativeElement);

        // Create x Axis
        this.chart
            .scale(ScaleType.Linear, Axis.x)
            .range(Axis.x)
            .domain(Axis.x, d3.max<DataType>(data, d => d.value))
            .axis(Axis.x);

        // Create y axis
        this.chart
            .scale(ScaleType.Band, Axis.y)
            .range(Axis.y)
            .domain(Axis.y, data.map<DataType>(d => d.text))
            .axis(Axis.y);

        // Crete bar
        this.chart._svg
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: DataType) => this.chart._yscale(d.text))
            .attr('height', this.chart._yscale.bandwidth())
            .attr('width', (d: DataType) => this.chart._xscale(d.value));
    }
}
