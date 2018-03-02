"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SomeBoringNetworkInput {
    constructor(a, b, c, d) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
    }
    getUniqueID() {
        return this.getInput().join('_');
    }
    getInput() {
        return [this._a, this._b, this._c, this._d];
    }
}
exports.SomeBoringNetworkInput = SomeBoringNetworkInput;
//# sourceMappingURL=SomeBoringNetworkInput.js.map