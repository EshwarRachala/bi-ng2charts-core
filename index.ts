import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3Service } from './src/d3.service';
@NgModule({
  imports: [CommonModule],
  declarations: [
  ],
  exports: [
  ],
  providers: [D3Service]

})

export class ChartsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChartsModule,
      providers: [D3Service]
    };
  }
}
