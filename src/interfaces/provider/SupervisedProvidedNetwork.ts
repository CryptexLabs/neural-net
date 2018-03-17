import {UnsupervisedNetworkTrainingResult} from "../unsupervised/UnsupervisedNetworkTrainingResult";
import {SupervisedNeuralNetInputData} from "../supervised/SupervisedNeuralNetInputData";

export interface SupervisedProvidedNetwork {
    trainSupervisedNetwork(input: SupervisedNeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;
}