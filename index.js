import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './src/shared.component';
export * from './src/shared.component';
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: []
        };
    };
    return SharedModule;
}());
export { SharedModule };
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [SharedComponent],
                exports: [
                    SharedComponent,
                ],
                bootstrap: [SharedComponent]
            },] },
];
/** @nocollapse */
SharedModule.ctorParameters = function () { return []; };
