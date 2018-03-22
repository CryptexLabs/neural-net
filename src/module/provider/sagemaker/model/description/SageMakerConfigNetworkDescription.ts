import {
    SageMakerInferenceImageAlgorithm,
    SageMakerInferenceImageDescriptions
} from "../../interface/description/SageMakerInferenceImageDescriptions";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescriptor";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerOutputDeserializer} from "../../interface/output/SageMakerOutputDeserializer";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";
import {SageMakerInputSerializer} from "../../interface/input/SageMakerInputSerializer";
import {NeuralNetInput} from "../../../../../interface/input/NeuralNetInput";

let SageMakerInferenceImageConfig = require('./sagemaker-inference-image-paths.json') as SageMakerInferenceImageDescriptions;

export class SageMakerConfigNetworkDescription implements SageMakerNetworkDescriptor, NetworkDescriptor {

    private _name: string;
    private _region: string;
    private _algorithm: string;
    private _modelDataUrl: string;
    private _outputDeserializer: SageMakerOutputDeserializer;
    private _inputSerializer: SageMakerInputSerializer;

    constructor(name: string, region: string, algorithm: SageMakerInferenceImageAlgorithm, inputSerializer: SageMakerInputSerializer, outputDeserializer: SageMakerOutputDeserializer) {
        this._name = name;
        this._outputDeserializer = outputDeserializer;
        this._inputSerializer = inputSerializer;
        this._setContainerImage(algorithm, region);
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

    public deserialize(data: any): NeuralNetOutput {
        return this._outputDeserializer.deserialize(data);
    }

    public serialize(input: NeuralNetInput) {
        return this._inputSerializer.serialize(input);
    }

}