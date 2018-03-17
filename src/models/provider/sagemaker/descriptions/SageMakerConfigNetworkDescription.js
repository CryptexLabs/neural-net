"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let SageMakerInferenceImageConfig = require('./sagemaker-inference-image-paths.json');
class SageMakerConfigNetworkDescription {
    constructor(name, region, algorithm) {
        this._name = name;
        this._region = region;
        this._algorithm = algorithm;
    }
    getName() {
        return this._name;
    }
    getContainerImage() {
        return SageMakerInferenceImageConfig[this._algorithm][this._region];
    }
    getModelDataUrl() {
        return undefined;
    }
}
exports.SageMakerConfigNetworkDescription = SageMakerConfigNetworkDescription;
//# sourceMappingURL=SageMakerConfigNetworkDescription.js.map