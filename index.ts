import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './src/shared.component';

@NgModule({
  imports: [CommonModule, SharedComponent],
  declarations: [],
  exports: [
    SharedComponent,
  ]
})
export class SharedModule { }  
