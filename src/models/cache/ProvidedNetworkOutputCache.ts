import {NeuralNet} from "../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../interfaces/input/NeuralNetInput";
import {OutputCache} from "./OutputCache";
import {NeuralNetOutput} from "../../interfaces/output/NeuralNetOutput";
import {OutputCacher} from "../../interfaces/cache/OutputCacher";

export class ProvidedNetworkOutputCache<T extends NeuralNetOutput> implements OutputCacher<T> {

    private _cache: OutputCache<T>;

    constructor() {
        this._cache = new OutputCache<T>();
    }

    public guess(providedNetwork: NeuralNet, input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._cache
            .get(input)
            .catch(() => {
                return providedNetwork.guess(input);
            }).then((output: T)=>{
                this._cache.set(input, output);
                return Promise.resolve(output);
            });
    }

    public setOutputsForInputs(inputs: NeuralNetInput[], outputs: T[]) {
        for (let i = 0; i < inputs.length; i++) {
            this._cache.set(inputs[i], outputs[i]);
        }
    }

}