import {NeuralNetInput} from "../../../../interfaces/NeuralNetInput";

export class RSIStrategyConfigNetworkInput implements NeuralNetInput {

	private _one_minute: number;
	private _five_minute: number;
	private _fifteen_minute: number;
	private _one_hour: number;
	private _four_hour: number;

	constructor(one_minute: number) {
		this._one_minute = one_minute;
	}

	getUniqueID(): string {
		return this.getInput().join('_');
	}

	getInput(): any[] {
		return [this._one_minute];
	}
}