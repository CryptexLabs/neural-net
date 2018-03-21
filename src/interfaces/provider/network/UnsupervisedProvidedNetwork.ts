import {NeuralNetInputData} from "../../input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../../unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNet} from "../../NeuralNet";
import {NeuralNetInput} from "../../input/NeuralNetInput";

export interface UnsupervisedProvidedNetwork extends NeuralNet {
    trainUnsupervisedNetwork<T extends NeuralNetInput>(input: NeuralNetInputData<T>): Promise<UnsupervisedNetworkTrainingResult>;

    scoreTrainingResult(resultID: string, score: number): Promise<void>;
}