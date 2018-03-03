import {NeuralNetInput} from "./NeuralNetInput";
import {UnsupervisedNetworkTrainingResult} from "./UnsupervisedNetworkTrainingResult";
import {NeuralNetOutput} from "./NeuralNetOutput";

export interface UnsupervisedNetwork {
	train(inputs: NeuralNetInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void);

	scoreTrainingResult(resultID: string, score: number, callback: (error: string) => void);

	setOutputsForInputs(inputs:NeuralNetInput[], outputs: NeuralNetOutput[]);
}