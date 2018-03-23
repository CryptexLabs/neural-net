import {NeuralNet} from "../../NeuralNet";
import {NeuralNetInput} from "../../input/NeuralNetInput";
import {NeuralNetOutput} from "../../output/NeuralNetOutput";

export interface ProvidedNetwork<N extends NeuralNet, I extends NeuralNetInput, O extends NeuralNetOutput> {
    guess(input: I): Promise<O>;
}