import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarChartComponent } from './src/bar-chart/bar-chart.component';

export * from './src/chart.component';
export * from './src/enums';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BarChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})

export class Ng2ChartsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2ChartsModule
    };
  }
}
