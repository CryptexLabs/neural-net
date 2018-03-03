import {NeuralNetOutput} from "../../../../interfaces/NeuralNetOutput";

export class RSIConfigNetworkOutput implements NeuralNetOutput{

	private _a: number;

	constructor(a: number){
		this._a = a;
	}
}