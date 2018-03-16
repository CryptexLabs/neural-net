"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputOutputMap_1 = require("../../map/InputOutputMap");
class RSIConfigNetwork {
    constructor(provider, market) {
    }
    train(input) {
        return undefined;
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