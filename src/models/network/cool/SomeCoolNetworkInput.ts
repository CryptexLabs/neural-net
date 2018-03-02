import {NeuralNetInput} from "../../../interfaces/NeuralNetInput";

export class SomeCoolNetworkInput implements NeuralNetInput {

	private _a: string;
	private _b: number;
	private _c: number;

	constructor(a: string, b: number, c: number) {
		this._a = a;
		this._b = b;
		this._c = c;
	}

	getUniqueID(): string {
		return this.getInput().join('_');
	}

	getInput(): any[] {
		return [this._a, this._b, this._c];
	}
}