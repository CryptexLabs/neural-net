import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";

export class SomeCoolNetworkOutput implements NeuralNetOutput {
    
    private _a: number;
    private _b: string;

    constructor(a: number, b: string) {
        this._a = a;
        this._b = b;
    }

    get a(): number {
        return this._a;
    }

    get b(): string {
        return this._b;
    }
}