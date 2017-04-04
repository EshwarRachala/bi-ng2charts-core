import { NgModule } from "@angular/core";
import { SharedComponent } from './src/shared.component';
import { SharedModule } from './src/shared.module';


@NgModule({
  declarations: [
    SharedComponent, SharedModule
  ],
  imports: [
    SharedModule
  ],
  exports: [SharedComponent,
    SharedModule]
})

export class ChartsModule {

}
