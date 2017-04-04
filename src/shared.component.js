import { Component } from '@angular/core';
var SharedComponent = (function () {
    function SharedComponent() {
    }
    return SharedComponent;
}());
export { SharedComponent };
SharedComponent.decorators = [
    { type: Component, args: [{
                selector: 'shared',
                template: "<h1>app works!</h1>"
            },] },
];
/** @nocollapse */
SharedComponent.ctorParameters = function () { return []; };
