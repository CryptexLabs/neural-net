import {SupervisedNetwork} from "../../../src/interface/supervised/SupervisedNetwork";
import {SupervisedNetworkTrainingResult} from "../../../src/interface/supervised/SupervisedNetworkTrainingResult";
import {SupervisedNeuralNetInput} from "../../../src/interface/supervised/SupervisedNeuralNetInput";
import {Market} from "cryptex-shared-models/src/models/market/Market";

export class SomeBoringNetwork implements SupervisedNetwork {

    private _market: Market;

    constructor(market: Market) {
        this._market = market;
    }

    public train(inputs: SupervisedNeuralNetInput[], callback: (error: string, result: SupervisedNetworkTrainingResult) => void) {
        throw new Error('SomeBoringNetwork.trainUnsupervisedNetwork not implemented')
    }
}