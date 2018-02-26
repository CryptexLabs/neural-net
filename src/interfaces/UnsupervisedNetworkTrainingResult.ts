import {NeuralNetOutput} from "./NeuralNetOutput";

export interface UnsupervisedNetworkTrainingResult {
	getOutputs(): NeuralNetOutput[];
	getResultID(): string;
}