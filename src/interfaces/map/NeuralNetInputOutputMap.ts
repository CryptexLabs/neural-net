import {NeuralNetInput} from "../input/NeuralNetInput";
import {NeuralNetOutput} from "../output/NeuralNetOutput";

export interface NeuralNetInputOutputMap<V extends NeuralNetOutput> {

    get(input: NeuralNetInput): Promise<V>;

    set(input: NeuralNetInput, output: V);

}