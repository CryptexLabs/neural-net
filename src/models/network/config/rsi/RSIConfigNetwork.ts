import {NeuralNet} from "../../../../interfaces/NeuralNet";
import {NeuralNetInput} from "../../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../../interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../../interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {InputOutputMap} from "../../map/InputOutputMap";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {NeuralNetInputData} from "../../../../interfaces/input/NeuralNetInputData";
import {UnsupervisedProvidedNetwork} from "../../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../interfaces/provider/KMeansNetworkProvider";

export class RSIConfigNetwork implements NeuralNet, UnsupervisedNetwork {

    private _inputOutputMap: InputOutputMap;
    private _networkProvider: KMeansNetworkProvider;
    private _market: Market;

    constructor(market: Market, provider: KMeansNetworkProvider) {
        this._market = market;
        this._networkProvider = provider;
    }

    train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.trainUnsupervisedNetwork(input);
            });
    }

    scoreTrainingResult(resultID: string, score: number): Promise<boolean> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork)=>{
                return network.scoreTrainingResult(resultID, score);
            })
    }

    guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.guess(input);
            });
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        return this._networkProvider.getKMeansNetwork(this._getNetworkName());
    }

    private _getNetworkName(): string {
        return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
    }

    setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
        if (!this._inputOutputMap) {
            this._inputOutputMap = new InputOutputMap()
        }
        this._inputOutputMap.setOutputsForInputs(inputs, outputs);
    }

}