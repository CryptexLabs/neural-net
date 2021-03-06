import {NeuralNet} from "../../../src/interface/NeuralNet";
import {UnsupervisedNetwork} from "../../../src/interface/unsupervised/UnsupervisedNetwork";
import {OutputCacher} from "../../../src/interface/cache/OutputCacher";
import {KMeansNetworkProvider} from "../../../src/interface/algorithm/kmeans/KMeansNetworkProvider";
import {ProvidedNetworkOutputCache} from "../../../src/model/cache/ProvidedNetworkOutputCache";
import {NeuralNetInputData} from "../../../src/interface/input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../../../src/interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedProvidedNetwork} from "../../../src/interface/provider/network/UnsupervisedProvidedNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {SomeCoolNetworkOutput} from "./SomeCoolNetworkOutput";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";
import {KMeansProvidedNetwork} from "../../../src/interface/algorithm/kmeans/KMeansProvidedNetwork";

let ucwords = require("ucwords");

interface Network extends KMeansProvidedNetwork {}
interface NetworkProvider extends KMeansNetworkProvider {}

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork, OutputCacher<SomeCoolNetworkOutput> {

    private _networkProvider: NetworkProvider;
    private _market: Market;
    private _cache: ProvidedNetworkOutputCache<Network, SomeCoolNetworkOutput>;

    constructor(market: Market, provider: NetworkProvider) {
        this._market = market;
        this._networkProvider = provider;

        // Cache will cache your results.
        // This is used 2 reasons.
        // 1. It could improve the performance of your guesses
        // 2. When using the network in a backtest as part of a training session you may need the output to be predetermined
        this._cache = new ProvidedNetworkOutputCache<Network, SomeCoolNetworkOutput>();
    }

    public train(input: NeuralNetInputData<SomeCoolNetworkInput>): Promise<UnsupervisedNetworkTrainingResult> {
        // For a n unsupervised network a data set that is a list of inputs must be provided
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.trainUnsupervisedNetwork(input);
            });
    }

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        // For unsupervised network a training session must be scored.
        return this._getNetwork()
            .then((network: Network) => {
                return network.scoreTrainingResult(resultID, score);
            })
    }

    public guess(input: SomeCoolNetworkInput): Promise<SomeCoolNetworkOutput> {
        // This will make a guess from the neural network based on the inputs
        // If the cache is enabled the cached results based on the inputs will be used
        return this._getNetwork()
            .then((network: Network) => {
                return this._cache.guess(network, input);
            });
    }

    public setOutputsForInputs(inputs: SomeCoolNetworkInput[], outputs: SomeCoolNetworkOutput[]) {
        // This will clear and update the cache.
        // The number of inputs should match the number of outputs exactly
        // This is not for training. This is for setting predetermined results of the this.guess(...) method
        return this._cache.setOutputsForInputs(inputs, outputs);
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        // This will return a ProvidedNetwork object that allows you to interact with the network on the remote service
        return this._networkProvider.getKMeansNetwork(this._getNetworkName());
    }

    private _getNetworkName(): string {
        // This is just a way of creating a unique network name specific based on what is unique about the network
        // In this case the Market aspects and the class name
        // Some network providers like Amazon SageMaker prohibit spaces so it is advisable to return a name without spaces here
        return ucwords([
            this.constructor.name,
            this._market.getExchangeKey(),
            this._market.getBaseKey(),
            this._market.getAssetKey()
        ].join(' ')).split(' ').join('');
    }

}