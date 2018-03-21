import {injectable} from "inversify";
import {SageMakerNeuralNetConfig} from "../../../../interfaces/NeuralNetConfig";

@injectable()
export class SageMakerJobService {

    private _config: SageMakerNeuralNetConfig;
    private _networkName: string;

    constructor(config: SageMakerNeuralNetConfig, networkName: string) {
        this._config = config;
        this._networkName = networkName;
    }

}