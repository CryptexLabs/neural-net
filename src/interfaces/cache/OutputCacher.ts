import {NeuralNetOutput} from "../output/NeuralNetOutput";
import {NeuralNetInput} from "../input/NeuralNetInput";

export interface OutputCacher<O extends NeuralNetOutput> {
    setOutputsForInputs(inputs:NeuralNetInput[], outputs: O[]);
}