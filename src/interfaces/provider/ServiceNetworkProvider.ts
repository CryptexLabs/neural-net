import {NetworkDescription} from "../description/NetworkDescription";
import {NeuralNet} from "../NeuralNet";

export interface ServiceNetworkProvider {
    getProvidedNetwork(description: NetworkDescription): Promise<NeuralNet>;
}