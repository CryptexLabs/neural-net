import {NeuralNetOutput} from "./NeuralNetOutput";
import {NeuralNetInput} from "./NeuralNetInput";

export interface SupervisedNeuralNetInput {
	getInput(): NeuralNetInput;
	getOutput(): NeuralNetOutput;
}