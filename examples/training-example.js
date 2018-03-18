"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NeuralNetService_1 = require("../src/models/NeuralNetService");
const RSIConfigNetwork_1 = require("../src/models/network/config/rsi/RSIConfigNetwork");
const Market_1 = require("cryptex-shared-models/src/models/market/Market");
const S3CSVInputData_1 = require("../src/models/input/S3CSVInputData");
let config = require('../config.json');
let service = new NeuralNetService_1.NeuralNetService(config);
let provider = service.getDefaultProvider();
let market = new Market_1.Market('GDAX', 'BTC', 'USD');
let network = new RSIConfigNetwork_1.RSIConfigNetwork(provider, market);
let data = new S3CSVInputData_1.S3CSVInputData('a-bucket-with-data', 'rsi/dev/data.csv');
network
    .train(data)
    .then((result) => {
    // Run a backtest or something
    let performanceResult = {
        getTrainingResultID() {
            return result.getResultID();
        },
        getScore() {
            return 80;
        }
    };
    return Promise.resolve(performanceResult);
})
    .then((result) => {
    return network.scoreTrainingResult(result.getTrainingResultID(), result.getScore());
})
    .then((success) => {
    // Run the training again or stop the training session
})
    .catch((reason) => {
    // Handle error
});
//# sourceMappingURL=training-example.js.map