import {NeuralNetInput} from "../../../../../../../interface/input/NeuralNetInput";

export interface SageMakerKMeansInput extends NeuralNetInput {
    getInputData(): any;
}