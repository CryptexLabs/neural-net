import {NeuralNet} from "../../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../../interfaces/NeuralNetInput";
import {NeuralNetOutput} from "../../../../interfaces/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../../interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {RSIStrategyConfigNetworkInput} from "./RSIStrategyConfigNetworkInput";
import {InputOutputMap} from "../../map/InputOutputMap";
import {SynapticUnsupervisedNeuralNetwork} from "../../synaptic/SynapticUnsupervisedNeuralNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {NetworkProvider} from "../../../../interfaces/provider/NetworkProvider";

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork {

	private _inputOutputMap: InputOutputMap;
	private _synapticNeuralNetwork: SynapticUnsupervisedNeuralNetwork;

	constructor(provider : NetworkProvider, market: Market) {

	}

	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void) {
		if(this._inputOutputMap) {
			callback(null, this._inputOutputMap.getOutputForInput(input))
		} else {
			// Get result from network
		}
	}

	train(inputs: RSIStrategyConfigNetworkInput[], callback: (error: string, result: UnsupervisedNetworkTrainingResult) => void) {
		if (this._synapticNeuralNetwork){
			this._synapticNeuralNetwork.train(inputs, callback)
		}
		throw new Error('RSIConfigNetwork.train not implemented')
	}

	scoreTrainingResult(resultID: string, score: number) {
		throw new Error('RSIConfigNetwork.scoreTrainingResult not implemented')
	}

	setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
		if(!this._inputOutputMap) {
			this._inputOutputMap = new InputOutputMap()
		}
		this._inputOutputMap.setOutputsForInputs(inputs, outputs);
	}

}