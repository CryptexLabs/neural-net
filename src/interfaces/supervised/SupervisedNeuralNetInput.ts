import {NeuralNetOutput} from "../output/NeuralNetOutput";
import {NeuralNetInput} from "../input/NeuralNetInput";

export interface SupervisedNeuralNetInput {
	getInput(): NeuralNetInput;
	getOutput(): NeuralNetOutput;
}