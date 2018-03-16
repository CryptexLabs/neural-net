import {NeuralNet} from "../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork{

    scoreTrainingResult(resultID: string, score: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void) {
		throw new Error('SomeCoolNetwork.loadResult not implemented')
	}

    setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {

    }

}