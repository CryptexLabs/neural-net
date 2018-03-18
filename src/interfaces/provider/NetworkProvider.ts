import {NeuralNet} from "../NeuralNet";
import {NetworkDescription} from "../description/NetworkDescription";

export interface NetworkProvider {
    getNetwork(description: NetworkDescription): Promise<NeuralNet>;
}