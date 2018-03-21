import {NeuralNetService} from "../models/NeuralNetService";
import {DefaultNetworkProvider} from "../interfaces/provider/provider/DefaultNetworkProvider";
import {NeuralNetConfig} from "../interfaces/NeuralNetConfig";

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