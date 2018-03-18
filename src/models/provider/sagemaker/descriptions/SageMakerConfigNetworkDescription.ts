import {SageMakerNetworkDescription} from "../../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {
    SageMakerInferenceImageAlgorithm,
    SageMakerInferenceImageDescriptions
} from "../../../../interfaces/provider/sagemaker/SageMakerInferenceImageDescriptions";

let SageMakerInferenceImageConfig = require('./sagemaker-inference-image-paths.json') as SageMakerInferenceImageDescriptions;

export class SageMakerConfigNetworkDescription implements SageMakerNetworkDescription {

    private _name: string;
    private _region: string;
    private _algorithm: string;

    constructor(name: string, region: string, algorithm: SageMakerInferenceImageAlgorithm) {
        this._name = name;
        this._region = region;
        this._algorithm = algorithm;
    }

    public getUniqueName(): string {
        return this._name;
    }

    public getContainerImage(): string {
        return SageMakerInferenceImageConfig[this._algorithm][this._region];
    }

    public getModelDataUrl(): string {
        // TODO Implement SageMakerConfigNetworkDescription::getModelDataUrl
        return undefined;
    }
}