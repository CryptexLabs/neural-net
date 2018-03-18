import {NeuralNet} from "../../../src/interfaces/NeuralNet";
import {NeuralNetInput} from "../../../src/interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../src/interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../src/interfaces/input/NeuralNetInputData";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork {

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public  train(input: NeuralNetInputData<SomeCoolNetworkInput>): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

    /**
     * @deprecated TODO find alternative
     */
    public setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
        throw new Error("Method not implemented.");
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        throw new Error('SomeCoolNetwork.guess not implemented')
    }
}