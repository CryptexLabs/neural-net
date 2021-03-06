import {ServiceNetworkProvider} from "../../interface/provider/provider/ServiceNetworkProvider";
import {NetworkProvider} from "../../interface/provider/provider/NetworkProvider";
import {NeuralNet} from "../../interface/NeuralNet";
import {NetworkCache} from "./NetworkCache";
import {NetworkDescriptor} from "../../interface/description/NetworkDescriptor";

export class ProvidedNetworkCache<P extends ServiceNetworkProvider<D>, N extends NeuralNet, D extends NetworkDescriptor> implements NetworkProvider<D> {

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