import {NeuralNet} from "../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../interfaces/input/NeuralNetInput";
import {ResultCache} from "./ResultCache";
import {NeuralNetOutput} from "../../interfaces/output/NeuralNetOutput";

export class CachingNetwork<T extends NeuralNetOutput> implements NeuralNet {

    private _cache: ResultCache<T>;
    private _network: NeuralNet;

    constructor(network: NeuralNet) {
        this._cache = new ResultCache<T>();
        this._network = network;
    }

    guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._cache
            .get(input)
            .catch(() => {
                return this._network.guess(input);
            });
    }

}