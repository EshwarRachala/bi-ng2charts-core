import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarChartComponent } from './src/barchart/barchart.component';
import { BubbleChartComponent } from './src/bubblechart/bubblechart.component';
import { LineChartComponent } from './src/linechart/linechart.component';


export * from './src/linechart/linechart.component';
export * from './src/barchart/barchart.component';
export * from './src/barchart/bars.component';
export * from './src/bubblechart/bubbles.component';
export * from './src/bubblechart/bubblechart.component';
 

@NgModule({
  imports: [CommonModule],
  declarations: [
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent
  ],
  exports: [
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
