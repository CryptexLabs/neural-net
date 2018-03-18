# Cryptex Neural Net #
Wrapper for training, and getting results from cryptex neural networks

![Build Status](https://codebuild.us-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWHRrVk9iaWxpSnFHUVFuY3BjN2tSUWhkR3ZHRU1VbVViYlMwY05PMm1yWDFuU2lGSFlhUTY4c0ovUVJjQW9YOVRsYk5ka2RrRzhHcTRRc0lncUxIMi80PSIsIml2UGFyYW1ldGVyU3BlYyI6Ijc4MzNVMllzS29pcml4bmsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## How to test

```bash
npm test
```

## How to train

```typescript
import {NetworkProviderService} from "./src/models/NetworkProviderService";
import {RSIConfigNetwork} from "./src/models/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {S3CSVInputData} from "./src/models/input/S3CSVInputData";
import {UnsupervisedNetworkTrainingResult} from "./src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedNetworkTrainingPerformanceResult} from "./src/interfaces/unsupervised/UnsupervisedNetworkTrainingPerformanceResult";

let provider = NetworkProviderService.getDefaultProvider();

let market = new Market('GDAX', 'BTC', 'USD');

let network = new RSIConfigNetwork(provider, market);

let data = new S3CSVInputData('a-bucket-with-data', 'rsi/dev/data.csv');

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
        // Run the training again or stop the training session
    })
    .catch((reason: Error) => {
        // Handle error
    });
```
    
## How to use

```typescript
import {NetworkProviderService} from "./src/models/NetworkProviderService";
import {RSIConfigNetwork} from "./src/models/network/config/rsi/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {RSIConfigNetworkInput} from "./src/models/network/config/rsi/RSIConfigNetworkInput";
import {NeuralNetOutput} from "./src/interfaces/output/NeuralNetOutput";

let provider = NetworkProviderService.getDefaultProvider();

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
```