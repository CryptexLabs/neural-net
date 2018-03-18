import {NeuralNet} from "../../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../../interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../../interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {NeuralNetInputData} from "../../../../interfaces/input/NeuralNetInputData";
import {UnsupervisedProvidedNetwork} from "../../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../interfaces/provider/KMeansNetworkProvider";
import {RSIConfigNetworkInput} from "./RSIConfigNetworkInput";
import {ProvidedNetworkOutputCache} from "../../../cache/ProvidedNetworkOutputCache";
import {OutputCacher} from "../../../../interfaces/cache/OutputCacher";
import {RSIConfigNetworkOutput} from "./RSIConfigNetworkOutput";

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork, OutputCacher<RSIConfigNetworkOutput> {

    private _networkProvider: KMeansNetworkProvider;
    private _market: Market;
    private _cacher: ProvidedNetworkOutputCache<RSIConfigNetworkOutput>;

    constructor(market: Market, provider: KMeansNetworkProvider) {
        this._market = market;
        this._networkProvider = provider;
        this._cacher = new ProvidedNetworkOutputCache<RSIConfigNetworkOutput>();
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
                return this._cacher.guess(network, input);
            });
    }

    public setOutputsForInputs(inputs: NeuralNetInput[], outputs: RSIConfigNetworkOutput[]) {
        return this._cacher.setOutputsForInputs(inputs, outputs);
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        return this._networkProvider.getKMeansNetwork(this._getNetworkName());
    }

    private _getNetworkName(): string {
        return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
    }

}