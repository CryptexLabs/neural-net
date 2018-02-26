import {SupervisedNetworkTrainingResult} from "./SupervisedNetworkTrainingResult";
import {SupervisedNeuralNetInput} from "./SupervisedNeuralNetInput";

export interface SupervisedNetwork {
	train(inputs: SupervisedNeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void);
}