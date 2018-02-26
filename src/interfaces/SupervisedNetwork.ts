import {NeuralNetInput} from "./NeuralNetInput";
import {SupervisedNetworkTrainingResult} from "./SupervisedNetworkTrainingResult";

export interface SupervisedNetwork {
	train(input: NeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void);
}