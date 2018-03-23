import {KMeansNeuralNetOutput} from "./KMeansNeuralNetOutput";
import {KMeansNeuralNetInput} from "./KMeansNeuralNetInput";
import {UnsupervisedProvidedNetwork} from "../../provider/network/UnsupervisedProvidedNetwork";

export interface KMeansProvidedNetwork extends UnsupervisedProvidedNetwork {
    guess(input: KMeansNeuralNetInput): Promise<KMeansNeuralNetOutput>;
}