import {NeuralNetService} from "../src/models/NeuralNetService";
import {RSIConfigNetwork} from "../src/models/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {S3CSVInputData} from "../src/models/input/S3CSVInputData";
import {UnsupervisedNetworkTrainingResult} from "../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedNetworkTrainingPerformanceResult} from "../src/interfaces/unsupervised/UnsupervisedNetworkTrainingPerformanceResult";

let market = new Market('GDAX', 'BTC', 'USD');

let provider = NeuralNetService.getDefaultProvider();

let network = new RSIConfigNetwork(market, provider);

let data = new S3CSVInputData('a-bucket-with-data', 'rsi/dev/data.csv');

let isTraining = true;
let sessionCount = 0;
let targetSessionCount = 100;

let loopInterval = setInterval(()=>{

    if(sessionCount >= targetSessionCount){
        clearInterval(loopInterval);
    }

    if(sessionCount < targetSessionCount && !isTraining){

        isTraining = true;

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
            .then((success: boolean) => {
                isTraining = false;
                sessionCount++;
            })
            .catch((reason: Error) => {
                clearInterval(loopInterval);
                console.error(reason);
            });
    }

},10);