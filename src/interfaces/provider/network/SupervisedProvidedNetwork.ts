import {UnsupervisedNetworkTrainingResult} from "../../unsupervised/UnsupervisedNetworkTrainingResult";
import {SupervisedNeuralNetInputData} from "../../supervised/SupervisedNeuralNetInputData";
import {NeuralNet} from "../../NeuralNet";

export interface SupervisedProvidedNetwork extends NeuralNet {
    trainSupervisedNetwork(input: SupervisedNeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;
}