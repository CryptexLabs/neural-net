import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedLearningSet} from "./UnsupervisedLearningSet";
import {RSIConfigNetworkInput} from "../config/rsi/RSIConfigNetworkInput";

export class SynapticUnsupervisedNeuralNetwork {

	private _network;

	public train(inputs: RSIConfigNetworkInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void) {
		if (this._network){

			let learning_set = new UnsupervisedLearningSet(inputs);

			this._network.trainUnsupervisedNetwork(learning_set);

			this._network.predict();


		}
		throw new Error('SynapticUnsupervisedNeuralNetwork.trainUnsupervisedNetwork not implemented')
	}

}