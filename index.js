import { NgModule } from '@angular/core';
import { SharedComponent } from './src/shared.component';
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
export { SharedModule };
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SharedComponent],
                exports: [
                    SharedComponent,
                ],
                bootstrap: [SharedComponent]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
