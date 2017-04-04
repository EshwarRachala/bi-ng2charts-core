import { Component } from '@angular/core';
var SharedComponent = (function () {
    function SharedComponent() {
    }
    return SharedComponent;
}());
export { SharedComponent };
SharedComponent.decorators = [
    { type: Component, args: [{
                selector: 'shared-component',
                template: "<h1>Sample component</h1>"
            },] },
];
/** @nocollapse */
SharedComponent.ctorParameters = function () { return []; };
