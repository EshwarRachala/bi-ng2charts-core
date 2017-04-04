import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './src/shared.component';
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
export { SharedModule };
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [SharedComponent],
                exports: [
                    SharedComponent,
                ]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
