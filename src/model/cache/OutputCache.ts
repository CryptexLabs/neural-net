import {NeuralNet} from "../../interface/NeuralNet";
import {NeuralNetInput} from "../../interface/input/NeuralNetInput";
import {NeuralNetOutput} from "../../interface/output/NeuralNetOutput";
import {NeuralNetInputOutputMap} from "../../interface/map/NeuralNetInputOutputMap";

export class OutputCache<V extends NeuralNetOutput> implements NeuralNet, NeuralNetInputOutputMap<V> {

    private _cache: Map<string, V>;

    constructor() {
        this._cache = new Map<string, V>();
    }

    public clear() {
        this._cache.clear();
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        throw new Error("Method not implemented.");
    }

    public set(input: NeuralNetInput, output: V) {
        this._cache.set(input.getUniqueID(), output);
    }

    public get(input: NeuralNetInput): Promise<V> {
        if (this._cache.has(input.getUniqueID())) {
            return Promise.resolve(this._cache.get(input.getUniqueID()));
        } else {
            return Promise.reject(new Error('No output exists for input'));
        }
    }
}