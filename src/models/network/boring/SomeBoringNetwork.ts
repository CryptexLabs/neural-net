import {SupervisedNetwork} from "../../../interfaces/supervised/SupervisedNetwork";
import {SupervisedNetworkTrainingResult} from "../../../interfaces/supervised/SupervisedNetworkTrainingResult";
import {SupervisedBoringNeuralNetInput} from "./SupervisedBoringNeuralNetInput";
import {BaseNetwork} from "../base/BaseNetwork";

export class SomeBoringNetwork extends BaseNetwork implements SupervisedNetwork {

	train(inputs: SupervisedBoringNeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void) {
		throw new Error('SomeBoringNetwork.trainUnsupervisedNetwork not implemented')
	}
}