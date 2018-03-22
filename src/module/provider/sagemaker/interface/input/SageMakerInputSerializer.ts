import {NeuralNetInput} from "../../../../../interface/input/NeuralNetInput";

export interface SageMakerInputSerializer {
    serialize(input: NeuralNetInput): any;
}