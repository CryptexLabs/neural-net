

import {
    SageMakerInferenceImageAlgorithm,
    SageMakerInferenceImageDescriptions
} from "../../interfaces/description/SageMakerInferenceImageDescriptions";
import {SageMakerNetworkDescriptor} from "../../interfaces/description/SageMakerNetworkDescription";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {NewableOutput} from "../../../../../interface/output/NewableOutput";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";

let SageMakerInferenceImageConfig = require('./sagemaker-inference-image-paths.json') as SageMakerInferenceImageDescriptions;

export class SageMakerConfigNetworkDescription implements SageMakerNetworkDescriptor, NetworkDescription {

    private _name: string;
    private _region: string;
    private _algorithm: string;
    private _modelDataUrl: string;
    private _outputClass: NewableOutput<NeuralNetOutput>;

    constructor(name: string, region: string, algorithm: SageMakerInferenceImageAlgorithm, outputClass: NewableOutput<NeuralNetOutput>) {
        this._name = name;
        this._setContainerImage(algorithm, region);
        this._outputClass = outputClass;
    }

    public getUniqueName(): string {
        return this._name;
    }

    public getContainerImage(): string {
        return SageMakerInferenceImageConfig[this._algorithm][this._region];
    }

    public getModelDataUrl(): string {
        return this._modelDataUrl;
    }

    public setModelDataUrl(url: string) {
        if (!url.match(/(s3:\/\/)(.*)(\/)(.*)(\.tar\.gz)/)) {
            throw new Error('invalid model url (' + url + ')');
        }
        this._modelDataUrl = url;
    }

    public getNewOutput(data: any): NeuralNetOutput {
        return new this._outputClass(data);
    }

    private _setContainerImage(algorithm: SageMakerInferenceImageAlgorithm, region: string) {

        if (!SageMakerInferenceImageConfig[algorithm]) {
            throw new Error('invalid algorithm (' + algorithm + ')');
        }
        if (!SageMakerInferenceImageConfig[algorithm][region]) {
            throw new Error('invalid region for algorithm (' + algorithm + ', ' + region + ')');
        }

        this._algorithm = algorithm;
        this._region = region;

    }

}