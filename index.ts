import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from 'd3-ng2-service';

import { BarChartComponent } from './src/barchart.component';

import { BubbleChartComponent } from './src/bubblechart.component';

export * from './src/shared.component';
export * from './src/barchart.component';
export * from './src/bubbles.component';
export * from './src/bubblechart.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    BarChartComponent,
    BubbleChartComponent
  ],
  exports: [
    BarChartComponent,
    BubbleChartComponent
  ],
  providers: [D3Service]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
