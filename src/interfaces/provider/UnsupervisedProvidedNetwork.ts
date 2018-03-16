import {NeuralNetInputData} from "../input/NeuralNetInputData";
import {NeuralNetOutputData} from "../output/NeuralNetOutputData";

export interface UnsupervisedProvidedNetwork {

    train(input: NeuralNetInputData): Promise<NeuralNetOutputData>;
}