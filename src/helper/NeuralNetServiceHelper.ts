import {NeuralNetService} from "../model/NeuralNetService";
import {DefaultNetworkProvider} from "../interface/provider/provider/DefaultNetworkProvider";
import {NeuralNetConfig} from "../interface/NeuralNetConfig";

let DefaultConfig = require('../../config.json') as NeuralNetConfig;

export class NeuralNetServiceHelper {

    private constructor(){}

    public static getWithDefaultConfig(): NeuralNetService.Service {
        return new NeuralNetService.Service(DefaultConfig);
    }

    public static getDefaultProvider(): DefaultNetworkProvider {
        return NeuralNetServiceHelper.getWithDefaultConfig().getDefaultProvider();
    }
}