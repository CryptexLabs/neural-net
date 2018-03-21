import {NeuralNetInput} from "../../../../interfaces/input/NeuralNetInput";

export class RSIConfigNetworkInput implements NeuralNetInput {

    private _fifteenMinute: number;
    private _oneHour: number;
    private _fourHour: number;
    private _oneDay: number;
    private _threeDay: number;
    private _oneWeek: number;

    constructor(fifteenMinute: number, oneHour: number, fourHour: number, oneDay: number, threeDay: number, oneWeek: number) {
        this._fifteenMinute = fifteenMinute;
        this._oneHour = oneHour;
        this._fourHour = fourHour;
        this._oneDay = oneDay;
        this._threeDay = threeDay;
        this._oneWeek = oneWeek;
    }

    getUniqueID(): string {
        return this.getInput().join('_');
    }

    getInput(): any[] {
        return [this._fifteenMinute, this._oneHour, this._fourHour, this._oneDay, this._threeDay, this._oneWeek];
    }
}