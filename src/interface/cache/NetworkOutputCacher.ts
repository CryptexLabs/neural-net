import {NeuralNetOutput} from "../output/NeuralNetOutput";
import {NeuralNetInput} from "../input/NeuralNetInput";

export interface NetworkOutputCacher<I extends NeuralNetInput, O extends NeuralNetOutput> {
    guess(input: I): Promise<O>;
}