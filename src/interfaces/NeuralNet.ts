import {NeuralNetInput} from "./input/NeuralNetInput";
import {NeuralNetOutput} from "./output/NeuralNetOutput";

export interface NeuralNet {
	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void);
}