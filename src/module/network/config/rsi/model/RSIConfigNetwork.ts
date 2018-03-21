import {NeuralNet} from "../../../../../interface/NeuralNet";
import {NeuralNetInput} from "../../../../../interface/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../../../interface/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../../interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {NeuralNetInputData} from "../../../../../interface/input/NeuralNetInputData";
import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../../interface/provider/provider/kmeans/KMeansNetworkProvider";
import {RSIConfigNetworkInput} from "./RSIConfigNetworkInput";
import {ProvidedNetworkOutputCache} from "../../../../../model/cache/ProvidedNetworkOutputCache";
import {OutputCacher} from "../../../../../interface/cache/OutputCacher";
import {RSIConfigNetworkOutput} from "./RSIConfigNetworkOutput";

let ucwords = require("ucwords");

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork, OutputCacher<RSIConfigNetworkOutput> {

    private _networkProvider: KMeansNetworkProvider;
    private _market: Market;
    private _cache: ProvidedNetworkOutputCache<RSIConfigNetworkOutput>;

    constructor(market: Market, provider: KMeansNetworkProvider) {
        this._market = market;
        this._networkProvider = provider;
        this._cache = new ProvidedNetworkOutputCache<RSIConfigNetworkOutput>();
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

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return this._cache.guess(network, input);
            });
    }

    public setOutputsForInputs(inputs: RSIConfigNetworkInput[], outputs: RSIConfigNetworkOutput[]) {
        return this._cache.setOutputsForInputs(inputs, outputs);
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        return this._networkProvider.getKMeansNetwork(RSIConfigNetworkOutput, this._getNetworkName());
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