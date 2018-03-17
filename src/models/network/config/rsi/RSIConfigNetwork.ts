import {NeuralNet} from "../../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../../interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../../interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {InputOutputMap} from "../../map/InputOutputMap";
import {SynapticUnsupervisedNeuralNetwork} from "../../synaptic/SynapticUnsupervisedNeuralNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {UnsupervisedNetworkProvider} from "../../../../interfaces/provider/UnsupervisedNetworkProvider";
import {NeuralNetInputData} from "../../../../interfaces/input/NeuralNetInputData";
import {UnsupervisedProvidedNetwork} from "../../../../interfaces/provider/UnsupervisedProvidedNetwork";

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork {

	private _inputOutputMap: InputOutputMap;
	private _synapticNeuralNetwork: SynapticUnsupervisedNeuralNetwork;
	private _networkProvider: UnsupervisedNetworkProvider;
	private _market: Market;

	constructor(provider: UnsupervisedNetworkProvider, market: Market) {
		this._networkProvider = provider;
		this._market          = market;
	}

	train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
		return this._networkProvider
			.getUnsupervisedNetwork(this._getNetworkName())
			.then((network: UnsupervisedProvidedNetwork) => {
				return network.train(input);
			});
	}

	private _getNetworkName(): string {
		return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
	}

	scoreTrainingResult(resultID: string, score: number): Promise<boolean> {
		return undefined;
	}

	loadResult(input: NeuralNetInput, callback: (error: string, output: NeuralNetOutput) => void) {
		if(this._inputOutputMap) {
			callback(null, this._inputOutputMap.getOutputForInput(input))
		} else {
			// Get result from network
		}
	}

	setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
		if(!this._inputOutputMap) {
			this._inputOutputMap = new InputOutputMap()
		}
		this._inputOutputMap.setOutputsForInputs(inputs, outputs);
	}

}