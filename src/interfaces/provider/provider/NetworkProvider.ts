import {NeuralNet} from "../../NeuralNet";

export interface NetworkProvider<D> {
    getNetwork(description: D): Promise<NeuralNet>;
}