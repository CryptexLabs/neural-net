"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SageMakerNetworkProvider_1 = require("./provider/sagemaker/SageMakerNetworkProvider");
let DefaultConfig = require('../../config.json');
class NeuralNetService {
    constructor(config) {
        this._config = config;
    }
    getDefaultProvider() {
        return this.getSageMakerNetworkProvider();
    }
    getSageMakerNetworkProvider() {
        return new SageMakerNetworkProvider_1.SageMakerNetworkProvider(this._config.amazon.sagemaker);
    }
    static getWithDefaultConfig() {
        return new NeuralNetService(DefaultConfig);
    }
    static getDefaultProvider() {
        return NeuralNetService.getWithDefaultConfig().getDefaultProvider();
    }
}
exports.NeuralNetService = NeuralNetService;
//# sourceMappingURL=NeuralNetService.js.map