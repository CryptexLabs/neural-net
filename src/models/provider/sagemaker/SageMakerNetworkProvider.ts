import {SageMakerNetwork} from "./SageMakerNetwork";
import {SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
import {AWSError, SageMaker} from "aws-sdk";
import {UnsupervisedNetworkProvider} from "../../../interfaces/provider/UnsupervisedNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {SageMakerNetworkDescription} from "../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {KMeansNetworkProvider} from "../../../interfaces/provider/KMeansNetworkProvider";
import {SageMakerConfigNetworkDescription} from "./descriptions/SageMakerConfigNetworkDescription";
import {SageMakerInferenceImageAlgorithm} from "../../../interfaces/provider/sagemaker/SageMakerInferenceImageDescriptions";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/SupervisedProvidedNetwork";

declare let AWS;

declare let ENV: string;

export class SageMakerNetworkProvider implements UnsupervisedNetworkProvider, KMeansNetworkProvider {

    private _config: SageMakerNeuralNetConfig;

    constructor(config: SageMakerNeuralNetConfig) {
        this._config = config;
    }

    public getKMeansNetwork(name: string): Promise<UnsupervisedProvidedNetwork> {
        return this.getNetwork(
            new SageMakerConfigNetworkDescription(name,
                AWS.config.region,
                SageMakerInferenceImageAlgorithm.kmeans)
        );
    }

    public getSupervisedNetwork(description: SageMakerNetworkDescription): Promise<SupervisedProvidedNetwork> {
        return this.getNetwork(description);
    }

    public getUnsupervisedNetwork(description: SageMakerNetworkDescription): Promise<UnsupervisedProvidedNetwork> {
        return this.getNetwork(description);
    }

    public getNetwork(description: SageMakerNetworkDescription): Promise<SageMakerNetwork> {

        return new Promise<SageMakerNetwork>((resolve, reject) => {

            let sagemaker = new AWS.SageMaker();

            let describeModelInput: SageMaker.DescribeModelInput = {
                ModelName: description.getName()
            };

            sagemaker.describeModel(describeModelInput, (error: AWSError, data: SageMaker.Types.DescribeModelOutput) => {
                if (!error) {
                    resolve(SageMakerNetwork.createFromDescribeModelOutput(data))
                } else {
                    this._getNetworkFromNewModel(description).then(resolve).catch(reject);
                }
            })
        });
    }

    private _getNetworkFromNewModel(description: SageMakerNetworkDescription): Promise<SageMakerNetwork> {

        return new Promise<SageMakerNetwork>((resolve, reject) => {

            let createModelInput: SageMaker.CreateModelInput = {
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

            sagemaker.createModel(createModelInput, (error: AWSError, data: SageMaker.Types.CreateModelOutput) => {
                if (!error) {
                    resolve(SageMakerNetwork.createFromCreateModelOutput(data))
                } else {
                    reject(error);
                }
            });

        })
    }

}