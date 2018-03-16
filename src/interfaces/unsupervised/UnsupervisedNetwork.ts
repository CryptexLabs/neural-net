import {NeuralNetInput} from "../input/NeuralNetInput";
import {UnsupervisedNetworkTrainingResult} from "./UnsupervisedNetworkTrainingResult";
import {NeuralNetOutput} from "../output/NeuralNetOutput";
import {NeuralNetInputData} from "../input/NeuralNetInputData";

export interface UnsupervisedNetwork {

	train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;

	scoreTrainingResult(resultID: string, score: number): Promise<boolean>;

	setOutputsForInputs(inputs:NeuralNetInput[], outputs: NeuralNetOutput[]);
}