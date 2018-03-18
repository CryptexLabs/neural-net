import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";

export class SomeBoringNetworkOutput implements NeuralNetOutput {
    
    private _a: number;

    constructor(a: number) {
        this._a = a;
    }
}