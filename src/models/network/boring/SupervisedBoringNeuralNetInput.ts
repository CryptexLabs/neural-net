import {SupervisedNeuralNetInput} from "../../../interfaces/supervised/SupervisedNeuralNetInput";
import {SomeBoringNetworkInput} from "./SomeBoringNetworkInput";
import {SomeBoringNetworkOutput} from "./SomeBoringNetworkOutput";

export class SupervisedBoringNeuralNetInput implements SupervisedNeuralNetInput {

	private _input: SomeBoringNetworkInput;
	private _output: SomeBoringNetworkOutput;

	constructor(input: SomeBoringNetworkInput, output: SomeBoringNetworkOutput) {
		this._input  = input;
		this._output = output;
	}

	getInput(): SomeBoringNetworkInput {
		return this._input;
	}

	getOutput(): SomeBoringNetworkOutput {
		return this._output;
	}

}