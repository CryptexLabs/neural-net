import {NeuralNetService} from "../src/models/NeuralNetService";
import {RSIConfigNetwork} from "../src/models/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {RSIConfigNetworkInput} from "../src/models/network/config/rsi/RSIConfigNetworkInput";
import {NeuralNetOutput} from "../src/interfaces/output/NeuralNetOutput";
import {NeuralNetConfig} from "../src/interfaces/NeuralNetConfig";

let config = require('../config.json') as NeuralNetConfig;

let service = new NeuralNetService(config);

let provider = service.getDefaultProvider();

let market = new Market('GDAX', 'BTC', 'USD');

let network = new RSIConfigNetwork(provider, market);

let input = new RSIConfigNetworkInput(40, 45, 60, 70, 40, 29);

network
    .loadResult(input)
    .then((output: NeuralNetOutput) => {
        // This is the guess of the neural network.
        // Use it in your application.
        console.log(output.getValues());
    })
    .catch((error: Error) => {
        // Do something with the error.
    });