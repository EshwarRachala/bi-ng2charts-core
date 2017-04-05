import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './src/shared.component';

export * from './src/shared.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SharedComponent],
  exports: [
    SharedComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
