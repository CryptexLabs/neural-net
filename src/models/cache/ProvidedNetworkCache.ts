import {ServiceNetworkProvider} from "../../interfaces/provider/ServiceNetworkProvider";
import {NetworkProvider} from "../../interfaces/provider/NetworkProvider";
import {NetworkDescription} from "../../interfaces/description/NetworkDescription";
import {NeuralNet} from "../../interfaces/NeuralNet";
import {NetworkCache} from "./NetworkCache";

export class ProvidedNetworkCache<P extends ServiceNetworkProvider, N extends NeuralNet> implements NetworkProvider {

    private _provider: P;
    private _cache: NetworkCache<N>;

    constructor(provider: P) {
        this._provider = provider;
        this._cache = new NetworkCache<N>()
    }

    public getNetwork(description: NetworkDescription): Promise<N> {
        return this._cache.get(description.getUniqueName())
            .catch(()=>{
                return this._provider.getProvidedNetwork(description);
            })
            .then((network: N) => {
                this._cache.set(description.getUniqueName(), network)
                return Promise.resolve<N>(network);
            });
    }
}