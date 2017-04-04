import { NgModule } from "@angular/core";
import { SharedComponent } from './src/shared.component';
import { SharedModule } from './src/shared.module';
var ChartsModule = (function () {
    function ChartsModule() {
    }
    return ChartsModule;
}());
export { ChartsModule };
ChartsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SharedComponent, SharedModule
                ],
                imports: [
                    SharedModule
                ],
                exports: [SharedComponent,
                    SharedModule]
            },] },
];
/** @nocollapse */
ChartsModule.ctorParameters = function () { return []; };
