import {DefaultNetworkProvider} from "../interfaces/provider/provider/DefaultNetworkProvider";
import {SageMakerNetworkProvider} from "./provider/sagemaker/SageMakerNetworkProvider";
import {NeuralNetConfig} from "../interfaces/NeuralNetConfig";
import {Container} from "inversify";
import {NeuralNetServiceContext} from "../interfaces/NeuralNetServiceContext";

let DefaultConfig = require('../../config.json') as NeuralNetConfig;

export class NeuralNetService implements NeuralNetServiceContext {

    private _config: NeuralNetConfig;
    private _injectableContainer: Container;
    private _sageMakerProvider;

    public constructor(config: NeuralNetConfig) {
        this._config = config;
        this._injectableContainer = new Container();
    }

    public static getWithDefaultConfig(): NeuralNetService {
        return new NeuralNetService(DefaultConfig);
    }

    public static getDefaultProvider(): DefaultNetworkProvider {
        return NeuralNetService.getWithDefaultConfig().getDefaultProvider();
    }

    public getContext(): Container {
        return this._injectableContainer;
    }

    public getDefaultProvider(): DefaultNetworkProvider {
        return this.getSageMakerNetworkProvider();
    }

    public getSageMakerNetworkProvider(): SageMakerNetworkProvider {
        if (!this._sageMakerProvider) {
            this._sageMakerProvider = new SageMakerNetworkProvider(this, this._config.amazon.sagemaker);
        }
        return this._sageMakerProvider;
    }
}