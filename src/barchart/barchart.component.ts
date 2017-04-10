// Loads some required modules from Angular.
import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
// Loads the code needed to manipulate the visualization
import { BarsComponent } from './bars.component';

// Identifies the class as a component directive that will be associated
// with `bubbles` elements in the DOM, and will include the 
// specified markup as its template
@Component({
    selector: 'bar-chart',
    template: '<svg #target></svg>'
})
export class BarChartComponent implements OnChanges, AfterViewInit {
    // Declares values as a data-bound property
    @Input() data: any[];

    // Gets a reference to the child DOM node
    @Input() width: any;
    @Input() height: any;
    @Input() margin: any;

    @ViewChild('target') target: any;
    // An instance of the BubblesChart


    chart: BarsComponent;

    constructor() {
    }

    // Lifecycle hook that is invoked when data-bound properties change
    ngOnChanges(changes: any) {
        if (this.chart) {
            this.chart.render(changes.data);
        }
    }

    // Lifecycle hook for when the component's view has been fully initialized
    ngAfterViewInit() {
        // We have to wait until the view has been initialized 
        // before we can get the
        //DOM element to bind the chart to it
        this.chart = new BarsComponent(this.target.nativeElement,
            this.width, this.height, this.margin);
        this.chart.render(this.data);
    }

}
