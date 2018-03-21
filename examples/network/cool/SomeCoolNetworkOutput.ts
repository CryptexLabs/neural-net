import {NeuralNetOutput} from "../../../src/interface/output/NeuralNetOutput";

export class SomeCoolNetworkOutput implements NeuralNetOutput {
    
    private _a: number;
    private _b: string;

    constructor(output: any[]) {
        this._a = output[0];
        this._b = output[1];
    }

    get a(): number {
        return this._a;
    }

    get b(): string {
        return this._b;
    }
}