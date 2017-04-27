import { NgModule, ModuleWithProviders } from '@angular/core';
import { D3Service } from './src/d3.service';

export * from './src/d3.service';


@NgModule({
  imports: [],
  providers: [D3Service]
})

export class D3Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: D3Module,
      providers: [D3Service]
    };
  }
}
