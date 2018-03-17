"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SageMakerNetwork_1 = require("./SageMakerNetwork");
let sagemaker = new AWS.SageMaker();
class SageMakerNetworkProvider {
    getUnsupervisedNetwork(name) {
        return new Promise((resolve, reject) => {
            let describeModelInput = {
                ModelName: name
            };
            sagemaker.describeModel(describeModelInput, (error, data) => {
                if (!error) {
                    resolve(SageMakerNetwork_1.SageMakerNetwork.createFromDescribeModelOutput(data));
                }
                else {
                    this._getNetworkFromNewModel(name).then(resolve).catch(reject);
                }
            });
        });
    }
    _getNetworkFromNewModel(name) {
        return new Promise((resolve, reject) => {
            let createModelInput = {
                ModelName: name,
                PrimaryContainer: {
                    Image: '',
                    Environment: {
                        'name': 'value'
                    }
                },
                ExecutionRoleArn: 'todo'
            };
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