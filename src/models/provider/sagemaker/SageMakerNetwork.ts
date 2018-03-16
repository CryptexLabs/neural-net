import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";
import {NeuralNetOutputData} from "../../../interfaces/output/NeuralNetOutputData";

export class SageMakerNetwork implements UnsupervisedProvidedNetwork {
    train(input: NeuralNetInputData): Promise<NeuralNetOutputData> {
        throw new Error("Method not implemented.");
    }
}