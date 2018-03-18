import {NeuralNet} from "../NeuralNet";

export interface NetworkCacher<N extends NeuralNet>{
    get(uniqueName: string): Promise<N>;
    set(uniqueName: string, network: N);
}