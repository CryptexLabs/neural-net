import {NeuralNetOutput} from "../../../../interfaces/output/NeuralNetOutput";

export class RSIConfigNetworkOutput implements NeuralNetOutput {

    private _a: number;

    constructor(output: any[]) {
        this._a = output[0];
    }
}