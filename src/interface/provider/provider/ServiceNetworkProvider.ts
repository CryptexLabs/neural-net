import {NeuralNet} from "../../NeuralNet";
import {NetworkDescription} from "../../description/NetworkDescription";

export interface ServiceNetworkProvider<D extends NetworkDescription> {
    getProvidedNetwork(description: D): Promise<NeuralNet>;
}