// Loads some required modules from Angular.
import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
// Loads the code needed to manipulate the visualization 

// Identifies the class as a component directive that will be associated
// with `bubbles` elements in the DOM, and will include the 
// specified markup as its template
@Component({
    selector: 'bar-chart',
    template: `<svg #target width="900" height="300">
                <h1>Hi</h1>
                </svg>`
})
export class BarChartComponent implements OnChanges, AfterViewInit {
    // Declares values as a data-bound property
    @Input() data: number[];
    // Gets a reference to the child DOM node
    @ViewChild('target') target: any;
    // An instance of the BubblesChart

    constructor() {
    }

    ngOnChanges(changes: any) {
    }

    ngAfterViewInit() {
    }

}
