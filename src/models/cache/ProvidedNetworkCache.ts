import {ServiceNetworkProvider} from "../../interfaces/provider/provider/ServiceNetworkProvider";
import {NetworkProvider} from "../../interfaces/provider/provider/NetworkProvider";
import {NeuralNet} from "../../interfaces/NeuralNet";
import {NetworkCache} from "./NetworkCache";
import {NetworkDescription} from "../../interfaces/description/NetworkDescription";

export class ProvidedNetworkCache<P extends ServiceNetworkProvider<D>, N extends NeuralNet, D extends NetworkDescription> implements NetworkProvider<D> {

    private _provider: P;
    private _cache: NetworkCache<N>;

    constructor(provider: P) {
        this._provider = provider;
        this._cache = new NetworkCache<N>()
    }

    public getNetwork(description: D): Promise<N> {
        return this._cache.get(description.getUniqueName())
            .catch(() => {
                return this._provider.getProvidedNetwork(description);
            })
            .then((network: N) => {
                this._cache.set(description.getUniqueName(), network);
                return Promise.resolve<N>(network);
            });
    }
}