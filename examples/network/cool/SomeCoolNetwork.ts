import {NeuralNet} from "../../../src/interfaces/NeuralNet";
import {NeuralNetInput} from "../../../src/interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../src/interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../src/interfaces/input/NeuralNetInputData";

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork {

    scoreTrainingResult(resultID: string, score: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

    /**
     * @deprecated
     * @todo remove
     */
    setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
        throw new Error("Method not implemented.");
    }

    guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        throw new Error('SomeCoolNetwork.guess not implemented')
    }
}