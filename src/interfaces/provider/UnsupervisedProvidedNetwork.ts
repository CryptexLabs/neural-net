import {NeuralNetInputData} from "../input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../unsupervised/UnsupervisedNetworkTrainingResult";

export interface UnsupervisedProvidedNetwork {

    train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;
}