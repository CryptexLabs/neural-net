import {NeuralNetOutput} from "../../../src/interface/output/NeuralNetOutput";

export class SomeBoringNetworkOutput implements NeuralNetOutput {
    
    private _a: number;

    constructor(a: number) {
        this._a = a;
    }

    get a(): number {
        return this._a;
    }
}