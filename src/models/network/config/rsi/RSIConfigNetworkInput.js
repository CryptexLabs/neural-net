"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RSIConfigNetworkInput {
    constructor(fifteenMinute, oneHour, fourHour, oneDay, threeDay, oneWeek) {
        this._fifteenMinute = fifteenMinute;
        this._oneHour = oneHour;
        this._fourHour = fourHour;
        this._oneDay = oneDay;
        this._threeDay = threeDay;
        this._oneWeek = oneWeek;
    }
    getUniqueID() {
        return this.getInput().join('_');
    }
    getInput() {
        return [this._fifteenMinute, this._oneHour, this._fourHour, this._oneDay, this._threeDay, this._oneWeek];
    }
}
exports.RSIConfigNetworkInput = RSIConfigNetworkInput;
//# sourceMappingURL=RSIConfigNetworkInput.js.map