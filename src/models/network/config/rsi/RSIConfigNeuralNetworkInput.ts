import {SupervisedNeuralNetInput} from "../../../interfaces/SupervisedNeuralNetInput";
import {SomeBoringNetworkInput} from "./SomeBoringNetworkInput";
import {SomeBoringNetworkOutput} from "./SomeBoringNetworkOutput";
import {RSIStrategyConfigNetworkInput} from "./RSIConfigNetworkInput";
import {RSIConfigNetworkOutput} from "./RSIConfigNetworkOutput";

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