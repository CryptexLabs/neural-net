import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";

export class SomeBoringNetworkOutput implements NeuralNetOutput {
    
    private _a: number;

    constructor(a: number) {
        this._a = a;
    }

    getValues(): any[] {
        return [this._a];
    }
}