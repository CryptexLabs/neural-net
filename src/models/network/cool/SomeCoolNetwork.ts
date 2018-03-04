import {NeuralNet} from "../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../interfaces/NeuralNetInput";
import {NeuralNetOutput} from "../../../interfaces/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../interfaces/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/UnsupervisedNetworkTrainingResult";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork{

	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void) {
		throw new Error('SomeCoolNetwork.loadResult not implemented')
	}

	train(input: SomeCoolNetworkInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void) {
		throw new Error('SomeCoolNetwork.train not implemented')
	}

	scoreTrainingResult(resultID: string, score: number) {
		throw new Error('SomeCoolNetwork.scoreTrainingResult not implemented')
	}

    setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {

    }

}