import {NeuralNetInput} from "./NeuralNetInput";
import {UnsupervisedNetworkTrainingResult} from "./UnsupervisedNetworkTrainingResult";

export interface UnsupervisedNetwork {
	train(input: NeuralNetInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void);

	scoreTrainingResult(resultID: string, score: number, callback: (error: string) => void);
}