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
	private _modelDataUrl:string;

	constructor(name: string, region: string, algorithm: SageMakerInferenceImageAlgorithm) {
		this._name = name;
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
		if (!url.match(/(s3:\/\/)(.*)(\/)(.*)(\.tar\.gz)/)){
			throw new Error('invalid model url (' + url + ')');
		}
		this._modelDataUrl = url;
	}

	private _setContainerImage(algorithm: SageMakerInferenceImageAlgorithm, region: string) {

		if(!SageMakerInferenceImageConfig[algorithm]) { throw new Error('invalid algorithm (' + algorithm + ')'); }
		if(!SageMakerInferenceImageConfig[algorithm][region]) { throw new Error('invalid region for algorithm (' + algorithm + ', ' + region + ')'); }

		this._algorithm = algorithm;
		this._region    = region;

	}

}