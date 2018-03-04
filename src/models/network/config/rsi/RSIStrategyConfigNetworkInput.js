"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RSIStrategyConfigNetworkInput {
    constructor(one_minute) {
        this._one_minute = one_minute;
    }
    getUniqueID() {
        return this.getInput().join('_');
    }
    getInput() {
        return [this._one_minute];
    }
}
exports.RSIStrategyConfigNetworkInput = RSIStrategyConfigNetworkInput;
//# sourceMappingURL=RSIStrategyConfigNetworkInput.js.map