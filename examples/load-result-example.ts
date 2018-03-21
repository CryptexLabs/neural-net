import {NeuralNetService} from "../src/model/NeuralNetService";
import {RSIConfigNetwork} from "../src/module/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {RSIConfigNetworkInput} from "../src/module/network/config/rsi/RSIConfigNetworkInput";
import {NeuralNetOutput} from "../src/interface/output/NeuralNetOutput";
import {NeuralNetConfig} from "../src/interface/NeuralNetConfig";

let config = require('../config.json') as NeuralNetConfig;

let service = new NeuralNetService.Service(config);

let market = new Market('GDAX', 'BTC', 'USD');

let provider = service.getDefaultProvider();

let network = new RSIConfigNetwork(market, provider);

let input = new RSIConfigNetworkInput(40, 45, 60, 70, 40, 29);

network
    .guess(input)
    .then((output: NeuralNetOutput) => {
        // This is the guess of the neural network.
        // Use it in your application.
    })
    .catch((error: Error) => {
        // Do something with the error.
    });