import {NeuralNetService} from "../service/NeuralNetService";
import {DefaultNetworkProvider} from "../interface/provider/provider/DefaultNetworkProvider";
import {NeuralNetConfig} from "../config/NeuralNetConfig";

let DefaultConfig = require('../../config.json') as NeuralNetConfig;

export class NeuralNetServiceHelper {

    private constructor(){}

    public static getWithDefaultConfig(): NeuralNetService.Service {
        return new NeuralNetService.Service(NeuralNetServiceHelper.getDefaultConfig());
    }

    public static getDefaultConfig(): NeuralNetConfig {
        return DefaultConfig;
    }

    public static getDefaultProvider(): DefaultNetworkProvider {
        return NeuralNetServiceHelper.getWithDefaultConfig().getDefaultProvider();
    }
}