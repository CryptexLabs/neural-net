import {NeuralNet} from "../../../../../interface/NeuralNet";
import {NeuralNetInput} from "../../../../../interface/input/NeuralNetInput";
import {UnsupervisedNetwork} from "../../../../../interface/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../../interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {NeuralNetInputData} from "../../../../../interface/input/NeuralNetInputData";
import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {RSIConfigNetworkInput} from "./RSIConfigNetworkInput";
import {ProvidedNetworkOutputCache} from "../../../../../model/cache/ProvidedNetworkOutputCache";
import {OutputCacher} from "../../../../../interface/cache/OutputCacher";
import {RSIConfigNetworkOutput} from "./RSIConfigNetworkOutput";
import {KMeansProvidedNetwork} from "../../../../../interface/algorithm/kmeans/KMeansProvidedNetwork";
import {KMeansNeuralNetOutput} from "../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";

let ucwords = require("ucwords");

interface Network extends KMeansProvidedNetwork {}
interface Output extends KMeansNeuralNetOutput {}
interface NetworkProvider extends KMeansNetworkProvider {}

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork, OutputCacher<Output> {

    private _networkProvider: NetworkProvider;
    private _market: Market;
    private _cache: ProvidedNetworkOutputCache<Network, Output>;

    constructor(market: Market, provider: NetworkProvider) {
        this._market = market;
        this._networkProvider = provider;
        this._cache = new ProvidedNetworkOutputCache<Network, Output>();
    }

    public train(input: NeuralNetInputData<RSIConfigNetworkInput>): Promise<UnsupervisedNetworkTrainingResult> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.trainUnsupervisedNetwork(input);
            });
    }

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.scoreTrainingResult(resultID, score);
            })
    }

    public guess(input: NeuralNetInput): Promise<RSIConfigNetworkOutput> {
        return this._getNetwork()
            .then((network: Network) => {
                return this._cache.guess(network, input);
            })
            .then((output: Output)=>{
                return new RSIConfigNetworkOutput(output);
            });
    }

    public setOutputsForInputs(inputs: RSIConfigNetworkInput[], outputs: RSIConfigNetworkOutput[]) {
        return this._cache.setOutputsForInputs(inputs, outputs);
    }

    private _getNetwork(): Promise<Network> {
        return this._networkProvider.getKMeansNetwork(this._getNetworkName());
    }

    private _getNetworkName(): string {
        return ucwords([
            this.constructor.name,
            this._market.getExchangeKey(),
            this._market.getBaseKey(),
            this._market.getAssetKey()
        ].join(' ')).split(' ').join('');
    }

}