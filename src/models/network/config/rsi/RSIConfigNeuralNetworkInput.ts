import {RSIConfigNetworkOutput} from "./RSIConfigNetworkOutput";
import {SupervisedNeuralNetInput} from "../../../../interfaces/supervised/SupervisedNeuralNetInput";
import {RSIStrategyConfigNetworkInput} from "./RSIStrategyConfigNetworkInput";

export class RSIConfigNeuralNetworkInput implements SupervisedNeuralNetInput {

	private _input: RSIStrategyConfigNetworkInput;
	private _output: RSIConfigNetworkOutput;

	constructor(input: RSIStrategyConfigNetworkInput, output: RSIConfigNetworkOutput) {
		this._input  = input;
		this._output = output;
	}

	getInput(): RSIStrategyConfigNetworkInput {
		return this._input;
	}

	getOutput(): RSIConfigNetworkOutput {
		return this._output;
	}

}