import {NeuralNet} from "../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../interfaces/output/NeuralNetOutput";
import {NeuralNetInputOutputMap} from "../../interfaces/map/NeuralNetInputOutputMap";

export class OutputCache<V extends NeuralNetOutput> implements NeuralNet, NeuralNetInputOutputMap<V> {

    private _cache: Map<string, V>;

    constructor(){
        this._cache = new Map<string, V>();
    }

    guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        throw new Error("Method not implemented.");
    }

    set(input: NeuralNetInput, output: V) {
        this._cache.set(input.getUniqueID(), output);
    }

    get(input: NeuralNetInput): Promise<V> {
        if(this._cache.has(input.getUniqueID())){
            return Promise.resolve(this._cache.get(input.getUniqueID()));
        }else{
            return Promise.reject(new Error('No output exists for input'));
        }
    }
}