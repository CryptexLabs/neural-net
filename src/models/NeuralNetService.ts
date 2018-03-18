import {DefaultNetworkProvider} from "../interfaces/provider/DefaultNetworkProvider";
import {SageMakerNetworkProvider} from "./provider/sagemaker/SageMakerNetworkProvider";
import {NeuralNetConfig} from "../interfaces/NeuralNetConfig";

let DefaultConfig = require('../../config.json') as NeuralNetConfig;

export class NeuralNetService {

    private _config: NeuralNetConfig;

    public constructor(config: NeuralNetConfig) {
        this._config = config;
    }

    public getDefaultProvider(): DefaultNetworkProvider {
        return this.getSageMakerNetworkProvider();
    }

    public getSageMakerNetworkProvider(): SageMakerNetworkProvider {
        return new SageMakerNetworkProvider(this._config.amazon.sagemaker);
    }

    public static getWithDefaultConfig() : NeuralNetService {
        return new NeuralNetService(DefaultConfig);
    }

    public static getDefaultProvider() : DefaultNetworkProvider {
        return NeuralNetService.getWithDefaultConfig().getDefaultProvider();
    }
}