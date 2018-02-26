import {NeuralNetInput} from "./NeuralNetInput";
import {NeuralNetOutput} from "./NeuralNetOutput";

export interface NeuralNet {
	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void);
}