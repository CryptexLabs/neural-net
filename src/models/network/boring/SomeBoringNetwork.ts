import {SupervisedNetwork} from "../../../interfaces/SupervisedNetwork";
import {SupervisedNetworkTrainingResult} from "../../../interfaces/SupervisedNetworkTrainingResult";
import {SupervisedBoringNeuralNetInput} from "./SupervisedBoringNeuralNetInput";

export class SomeBoringNetwork implements SupervisedNetwork {

	train(inputs: SupervisedBoringNeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void) {
		throw new Error('SomeBoringNetwork.train not implemented')
	}

}