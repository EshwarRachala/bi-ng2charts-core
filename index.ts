import { NgModule } from '@angular/core';
import { SharedComponent } from './src/shared.component';

@NgModule({
  declarations: [SharedComponent],
  exports: [
    SharedComponent,
  ],
  bootstrap: [SharedComponent]
})
export class SharedModule { }  
