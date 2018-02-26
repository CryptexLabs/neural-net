import {NeuralNetOutput} from "./NeuralNetOutput";
import {NeuralNetInput} from "./NeuralNetInput";

export interface SupervisedNeuralNetInput {

	constructor(input: NeuralNetInput, output: NeuralNetOutput);
	getInput(): NeuralNetInput;
	getOutput(): NeuralNetOutput;
}