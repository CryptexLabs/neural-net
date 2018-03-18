import {NeuralNet} from "../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../interfaces/input/NeuralNetInput";
import {OutputCache} from "./OutputCache";
import {NeuralNetOutput} from "../../interfaces/output/NeuralNetOutput";
import {OutputCacher} from "../../interfaces/cache/OutputCacher";

export class ProvidedNetworkOutputCache<O extends NeuralNetOutput> implements OutputCacher<O> {

    private _cache: OutputCache<O>;

    constructor() {
        this._cache = new OutputCache<O>();
    }

    public guess(providedNetwork: NeuralNet, input: NeuralNetInput): Promise<O> {
        return this._cache
            .get(input)
            .catch(() => {
                return providedNetwork.guess(input);
            }).then((output: O)=>{
                this._cache.set(input, output);
                return Promise.resolve(output);
            });
    }

    public setOutputsForInputs(inputs: NeuralNetInput[], outputs: O[]) {
        this._cache.clear();
        for (let i = 0; i < inputs.length; i++) {
            this._cache.set(inputs[i], outputs[i]);
        }
    }

}