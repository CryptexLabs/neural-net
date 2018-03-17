"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputOutputMap_1 = require("../../map/InputOutputMap");
class RSIConfigNetwork {
    constructor(provider, market) {
        this._networkProvider = provider;
        this._market = market;
    }
    train(input) {
        return this._networkProvider
            .getUnsupervisedNetwork(this._getNetworkName())
            .then((network) => {
            return network.train(input);
        });
    }
    _getNetworkName() {
        return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
    }
    scoreTrainingResult(resultID, score) {
        return undefined;
    }
    loadResult(input, callback) {
        if (this._inputOutputMap) {
            callback(null, this._inputOutputMap.getOutputForInput(input));
        }
        else {
            // Get result from network
        }
    }
    setOutputsForInputs(inputs, outputs) {
        if (!this._inputOutputMap) {
            this._inputOutputMap = new InputOutputMap_1.InputOutputMap();
        }
        this._inputOutputMap.setOutputsForInputs(inputs, outputs);
    }
}
exports.RSIConfigNetwork = RSIConfigNetwork;
//# sourceMappingURL=RSIConfigNetwork.js.map