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
    private _unsupervisedNetwork: UnsupervisedProvidedNetwork;
    private _networkProvider: KMeansNetworkProvider;
    private _market: Market;

    constructor(provider: KMeansNetworkProvider, market: Market) {
        this._networkProvider = provider;
        this._market = market;
    }

    train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.trainUnsupervisedNetwork(input);
            });
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        if(!this._unsupervisedNetwork){
            return this._networkProvider.getKMeansNetwork(this._getNetworkName())
        }else{
            return Promise.resolve(this._unsupervisedNetwork);
        }
    }

    private _getNetworkName(): string {
        return ['RSI_CONFIG', this._market.getMarketKey()].join('_');
    }

    scoreTrainingResult(resultID: string, score: number): Promise<boolean> {
        return undefined;
    }

    loadResult(input: NeuralNetInput): Promise<NeuralNetOutput> {
        if (this._inputOutputMap) {
            return Promise.resolve(this._inputOutputMap.getOutputForInput(input))
        } else {
            // TODO Get result from network
            return undefined;
        }
    }

    setOutputsForInputs(inputs: NeuralNetInput[], outputs: NeuralNetOutput[]) {
        if (!this._inputOutputMap) {
            this._inputOutputMap = new InputOutputMap()
        }
        this._inputOutputMap.setOutputsForInputs(inputs, outputs);
    }

}