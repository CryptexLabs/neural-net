import {SupervisedNetwork} from "../../../interfaces/supervised/SupervisedNetwork";
import {SupervisedNetworkTrainingResult} from "../../../interfaces/supervised/SupervisedNetworkTrainingResult";
import {BaseNetwork} from "../base/BaseNetwork";
import {SupervisedNeuralNetInput} from "../../../interfaces/supervised/SupervisedNeuralNetInput";

export class SomeBoringNetwork extends BaseNetwork implements SupervisedNetwork {
    train(inputs: SupervisedNeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void) {
        throw new Error('SomeBoringNetwork.trainUnsupervisedNetwork not implemented')
    }
}