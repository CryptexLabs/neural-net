"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputOutputMap_1 = require("../../map/InputOutputMap");
class RSIConfigNetwork {
    constructor(provider, market) {
        this._networkProvider = provider;
        this._market = market;
    }
    train(input) {
        return this._getNetwork()
            .then((network) => {
            return network.trainUnsupervisedNetwork(input);
        });
    }
    _getNetwork() {
        if (!this._unsupervisedNetwork) {
            return this._networkProvider.getKMeansNetwork(this._getNetworkName());
        }
        else {
            return Promise.resolve(this._unsupervisedNetwork);
        }
    }
    _getNetworkName() {
        return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
    }
    scoreTrainingResult(resultID, score) {
        return undefined;
    }
    loadResult(input) {
        if (this._inputOutputMap) {
            return Promise.resolve(this._inputOutputMap.getOutputForInput(input));
        }
        else {
            // TODO Get result from network
            return undefined;
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