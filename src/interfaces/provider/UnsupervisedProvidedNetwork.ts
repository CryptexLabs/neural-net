import {NeuralNetInputData} from "../input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNet} from "../NeuralNet";
import {UnsupervisedNetwork} from "../unsupervised/UnsupervisedNetwork";

export interface UnsupervisedProvidedNetwork extends NeuralNet {
    trainUnsupervisedNetwork(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult>;
    scoreTrainingResult(resultID: string, score: number): Promise<boolean>;
}