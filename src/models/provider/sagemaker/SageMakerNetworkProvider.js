"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SageMakerNetwork_1 = require("./SageMakerNetwork");
const SageMakerConfigNetworkDescription_1 = require("./descriptions/SageMakerConfigNetworkDescription");
const SageMakerInferenceImageDescriptions_1 = require("../../../interfaces/provider/sagemaker/SageMakerInferenceImageDescriptions");
class SageMakerNetworkProvider {
    constructor(config) {
        this._config = config;
    }
    getKMeansNetwork(name) {
        return this.getNetwork(new SageMakerConfigNetworkDescription_1.SageMakerConfigNetworkDescription(name, AWS.config.region, SageMakerInferenceImageDescriptions_1.SageMakerInferenceImageAlgorithm.kmeans));
    }
    getSupervisedNetwork(description) {
        return this.getNetwork(description);
    }
    getUnsupervisedNetwork(description) {
        return this.getNetwork(description);
    }
    getNetwork(description) {
        return new Promise((resolve, reject) => {
            let sagemaker = new AWS.SageMaker();
            let describeModelInput = {
                ModelName: description.getName()
            };
            sagemaker.describeModel(describeModelInput, (error, data) => {
                if (!error) {
                    resolve(SageMakerNetwork_1.SageMakerNetwork.createFromDescribeModelOutput(data));
                }
                else {
                    this._getNetworkFromNewModel(description).then(resolve).catch(reject);
                }
            });
        });
    }
    _getNetworkFromNewModel(description) {
        return new Promise((resolve, reject) => {
            let createModelInput = {
                ExecutionRoleArn: this._config.roleARN,
                ModelName: description.getName(),
                PrimaryContainer: {
                    Image: description.getContainerImage(),
                    ModelDataUrl: description.getModelDataUrl()
                },
                Tags: [
                    {
                        Key: 'environment',
                        Value: ENV
                    },
                ]
            };
            let sagemaker = new AWS.SageMaker();
            sagemaker.createModel(createModelInput, (error, data) => {
                if (!error) {
                    resolve(SageMakerNetwork_1.SageMakerNetwork.createFromCreateModelOutput(data));
                }
                else {
                    reject(error);
                }
            });
        });
    }
}
exports.SageMakerNetworkProvider = SageMakerNetworkProvider;
//# sourceMappingURL=SageMakerNetworkProvider.js.map