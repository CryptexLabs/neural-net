"use strict";
///<ref="../../../interfaces/NeuralNetInput.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
class SomeCoolNetworkInput {
    constructor(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;
    }
    getUniqueID() {
        return this.getInput().join('_');
    }
    getInput() {
        return [this._a, this._b, this._c];
    }
}
exports.SomeCoolNetworkInput = SomeCoolNetworkInput;
//# sourceMappingURL=SomeCoolNetworkInput.js.map