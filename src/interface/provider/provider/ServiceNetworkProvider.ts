import {NeuralNet} from "../../NeuralNet";
import {NetworkDescriptor} from "../../description/NetworkDescriptor";

export interface ServiceNetworkProvider<D extends NetworkDescriptor> {
    getProvidedNetwork(description: D): Promise<NeuralNet>;
}