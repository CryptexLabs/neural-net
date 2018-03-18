import {NeuralNetService} from "../src/models/NeuralNetService";
import {RSIConfigNetwork} from "../src/models/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {S3CSVInputData} from "../src/models/input/S3CSVInputData";
import {UnsupervisedNetworkTrainingResult} from "../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedNetworkTrainingPerformanceResult} from "../src/interfaces/unsupervised/UnsupervisedNetworkTrainingPerformanceResult";
import {NeuralNetConfig} from "../src/interfaces/NeuralNetConfig";
import {RSIConfigNetworkInput} from "../src/models/network/config/rsi/RSIConfigNetworkInput";

let config = require('../config.json') as NeuralNetConfig;

let market = new Market('GDAX', 'BTC', 'USD');

let service = new NeuralNetService(config);

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