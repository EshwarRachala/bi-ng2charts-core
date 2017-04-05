import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './src/shared.component';
import { BarChartComponent } from './src/barchart.component';

export * from './src/shared.component';
export * from './src/barchart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SharedComponent,
    BarChartComponent
    ],
  exports: [
    SharedComponent,
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
