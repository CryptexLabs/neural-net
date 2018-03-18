import {NeuralNetInput} from "./input/NeuralNetInput";
import {NeuralNetOutput} from "./output/NeuralNetOutput";

export interface NeuralNet{
	guess(input: NeuralNetInput): Promise<NeuralNetOutput>;
}