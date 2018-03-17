import {NeuralNetInputData} from "../input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../unsupervised/UnsupervisedNetworkTrainingResult";

export interface UnsupervisedProvidedNetwork {
    trainUnsupervisedNetwork(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;
}