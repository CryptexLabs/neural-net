"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputOutputMap_1 = require("../../map/InputOutputMap");
class RSIConfigNetwork {
    constructor() {
    }
    loadResult(input, callback) {
        if (this._inputOutputMap) {
            callback(null, this._inputOutputMap.getOutputForInput(input));
        }
        else {
            // Get result from network
        }
    }
    train(inputs, callback) {
        if (this._synapticNeuralNetwork) {
            this._synapticNeuralNetwork.train(inputs, callback);
        }
        throw new Error('RSIConfigNetwork.train not implemented');
    }
    scoreTrainingResult(resultID, score) {
        throw new Error('RSIConfigNetwork.scoreTrainingResult not implemented');
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