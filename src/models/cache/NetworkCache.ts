import {NeuralNet} from "../../interfaces/NeuralNet";
import {NetworkCacher} from "../../interfaces/cache/NetworkCacher";

export class NetworkCache<N extends NeuralNet> implements NetworkCacher<N> {

    private _cache: Map<string, N>;

    constructor(){
        this._cache = new Map<string, N>();
    }

    set(uniqueName: string, network: N) {
        this._cache.set(uniqueName, network);
    }

    get(uniqueName: string): Promise<N>{
        if(this._cache.has(uniqueName)){
            return Promise.resolve(this._cache.get(uniqueName));
        }else{
            return Promise.reject(new Error('No network exists for that unique name'));
        }
    }
}