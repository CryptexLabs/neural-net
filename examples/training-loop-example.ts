import {RSIConfigNetwork} from "../src/module/network/config/rsi/model/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {S3CSVInputData} from "../src/model/input/S3CSVInputData";
import {UnsupervisedNetworkTrainingResult} from "../src/interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedNetworkTrainingPerformanceResult} from "../src/interface/unsupervised/UnsupervisedNetworkTrainingPerformanceResult";
import {NeuralNetServiceHelper} from "../src/helper/NeuralNetServiceHelper";

let market = new Market('GDAX', 'BTC', 'USD');

let provider = NeuralNetServiceHelper.getDefaultProvider();

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
            .then(() => {
                isTraining = false;
                sessionCount++;
            })
            .catch((reason: Error) => {
                clearInterval(loopInterval);
                console.error(reason);
            });
    }

},10);