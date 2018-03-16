import {NeuralNetInput} from "../../../interfaces/input/NeuralNetInput";

export class SomeBoringNetworkInput implements NeuralNetInput {

	private _a: string;
	private _b: number;
	private _c: string;
	private _d: number;

	constructor(a: string, b: number, c: string, d: number) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	}

	getUniqueID(): string {
		return this.getInput().join('_');
	}

	getInput(): any[] {
		return [this._a, this._b, this._c, this._d] ;
	}

}