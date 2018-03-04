"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnsupervisedLearningSet_1 = require("./UnsupervisedLearningSet");
class SynapticUnsupervisedNeuralNetwork {
    train(inputs, callback) {
        if (this._network) {
            let learning_set = new UnsupervisedLearningSet_1.UnsupervisedLearningSet(inputs);
            this._network.train(learning_set);
            this._network.predict();
        }
        throw new Error('SynapticUnsupervisedNeuralNetwork.train not implemented');
    }
}
exports.SynapticUnsupervisedNeuralNetwork = SynapticUnsupervisedNeuralNetwork;
//# sourceMappingURL=SynapticUnsupervisedNeuralNetwork.js.map