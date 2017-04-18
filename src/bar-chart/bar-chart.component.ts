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
        // tslint:disable-next-line:curly
        if (!changes.data) return;
        this.data = changes.data.currentValue;
        this.render(this.data);
    }

    ngAfterViewInit() {
    }

    render(data: Array<DataType>) {

        // Reference d3 
        const d3 = this.chart.d3;

        let svg = this.chart.createSvg(this.target.nativeElement);

        // Create x Axis
        this.chart
            .Scale(ScaleType.Linear, Axis.x)
            .Range(Axis.x)
            .Domain(Axis.x, d3.max<DataType>(data, d => d.value))
            .Axis(Axis.x);

        // Create y axis
        this.chart
            .Scale(ScaleType.Band, Axis.y)
            .Range(Axis.y)
            .Domain(Axis.y, data.map<DataType>(d => d.text))
            .Axis(Axis.y);

        // Crete bar
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('y', (d: DataType) => this.chart.yscale(d.text))
            .attr('height', this.chart.yscale.bandwidth())
            .attr('width', (d: DataType) => this.chart.xscale(d.value));
    }
}
