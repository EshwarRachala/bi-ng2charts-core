import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarChartComponent } from './src/bar-chart/bar-chart.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    BarChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
