import {SageMakerNetwork} from "./SageMakerNetwork";
import {SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
import {SageMaker} from "aws-sdk";
import {UnsupervisedNetworkProvider} from "../../../interfaces/provider/UnsupervisedNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {SageMakerNetworkDescription} from "../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {KMeansNetworkProvider} from "../../../interfaces/provider/KMeansNetworkProvider";
import {SageMakerConfigNetworkDescription} from "./description/SageMakerConfigNetworkDescription";
import {SageMakerInferenceImageAlgorithm} from "../../../interfaces/provider/sagemaker/SageMakerInferenceImageDescriptions";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/SupervisedProvidedNetwork";
import {ProvidedNetworkCache} from "../../cache/ProvidedNetworkCache";
import {NetworkProvider} from "../../../interfaces/provider/NetworkProvider";
import {ServiceNetworkProvider} from "../../../interfaces/provider/ServiceNetworkProvider";

declare let AWS;
declare let ENV: string;

export class SageMakerNetworkProvider implements NetworkProvider, ServiceNetworkProvider, UnsupervisedNetworkProvider, KMeansNetworkProvider {

    private _config: SageMakerNeuralNetConfig;
    private _cache: ProvidedNetworkCache<SageMakerNetworkProvider, SageMakerNetwork>;
    private _sageMaker: SageMaker;

    constructor(config: SageMakerNeuralNetConfig) {
        this._config = config;
        this._cache = new ProvidedNetworkCache<SageMakerNetworkProvider, SageMakerNetwork>(this);
        this._sageMaker = new AWS.SageMaker();
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
        return this._cache.getNetwork(description);
    }

    public getProvidedNetwork(description: SageMakerNetworkDescription): Promise<SageMakerNetwork> {
        return this._getNetworkFromExistingModel(description)
            .catch(() => {
                return this._getNetworkFromNewModel(description);
            });
    }

    private _getNetworkFromExistingModel(description: SageMakerNetworkDescription): Promise<SageMakerNetwork> {

        let describeModelInput: SageMaker.DescribeModelInput = {
            ModelName: description.getUniqueName()
        };

        return this._sageMaker
            .describeModel(describeModelInput).promise()
            .then(SageMakerNetwork.createFromDescribeModelOutput)
    }

    private _getNetworkFromNewModel(description: SageMakerNetworkDescription): Promise<SageMakerNetwork> {

        let createModelInput: SageMaker.CreateModelInput = {
            ExecutionRoleArn: this._config.roleARN,
            ModelName: description.getUniqueName(),
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

        return this._sageMaker
            .createModel(createModelInput).promise()
            .then(SageMakerNetwork.createFromCreateModelOutput);
    }
}