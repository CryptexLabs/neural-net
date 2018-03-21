import {NeuralNetService} from "../src/model/NeuralNetService";
import {RSIConfigNetwork} from "../src/module/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {S3CSVInputData} from "../src/model/input/S3CSVInputData";
import {UnsupervisedNetworkTrainingResult} from "../src/interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedNetworkTrainingPerformanceResult} from "../src/interface/unsupervised/UnsupervisedNetworkTrainingPerformanceResult";
import {NeuralNetConfig} from "../src/interface/NeuralNetConfig";
import {RSIConfigNetworkInput} from "../src/module/network/config/rsi/RSIConfigNetworkInput";

let config = require('../config.json') as NeuralNetConfig;

let market = new Market('GDAX', 'BTC', 'USD');

let service = new NeuralNetService.Service(config);

let provider = service.getDefaultProvider();

let network = new RSIConfigNetwork(market, provider);

let data = new S3CSVInputData<RSIConfigNetworkInput>('a-bucket-with-data', 'rsi/dev/data.csv');

network
    .train(data)
    .then((result: UnsupervisedNetworkTrainingResult) => {
        // Run a backtest or something
        let performanceResult : UnsupervisedNetworkTrainingPerformanceResult = {

            getTrainingResultID(): string {
                return result.getResultID();
            },
            getScore(): number {
                return 80;
            }
        };

        return Promise.resolve(performanceResult);
    })
    .then((result: UnsupervisedNetworkTrainingPerformanceResult) => {
        return network.scoreTrainingResult(result.getTrainingResultID(), result.getScore())
    })
    .then(() => {
        // Run the training again or stop the training session
    })
    .catch((reason: Error) => {
        // Handle error
    });