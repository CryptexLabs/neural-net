import {RSIStrategyConfigNetworkInput} from "../config/rsi/RSIStrategyConfigNetworkInput";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/UnsupervisedNetworkTrainingResult";
import {UnsupervisedLearningSet} from "./UnsupervisedLearningSet";

export class SynapticUnsupervisedNeuralNetwork {
	private _network;

	public train(inputs: RSIStrategyConfigNetworkInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void) {
		if (this._network){

			let learning_set = new UnsupervisedLearningSet(inputs);

			_network.train(learning_set);

			_network.predict();


		}
		throw new Error('SynapticUnsupervisedNeuralNetwork.train not implemented')
	}

}