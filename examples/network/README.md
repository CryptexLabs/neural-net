[//]: # (Only edit this file if it is in $project/in directory. This file is compiled)
## Implementing a new network

### Guidelines
New neural networks should have a unique combination of inputs, outputs, and network types. As a general rule networks should have a specific use and avoid generic use. For example "SemanticTextCategory" should be "WebpageTextMarketSentimentCategorizer". This way it fulfills the descriptive of the type of network (Semantic text categorization) and also tells us what its being used for (Market sentiment analysis). Without specifying the intended use in the implantation name the class becomes hard to use correctly and might be confusing to implement. 

### Types of networks
There are 2 types of networks that can be implemented
1. Unsupervised network
2. Supervised network

#### Unsupervised network
Each unsupervised network should implement 3 classes like so

1. A network class. This is the base class for the network that clients of the library will conduct training on and getting network guesses from.

[embedmd]:# (../../../examples/network/cool/SomeCoolNetwork.ts typescript)
```typescript
import {NeuralNet} from "../../../src/interfaces/NeuralNet";
import {UnsupervisedNetwork} from "../../../src/interfaces/unsupervised/UnsupervisedNetwork";
import {OutputCacher} from "../../../src/interfaces/cache/OutputCacher";
import {KMeansNetworkProvider} from "../../../src/interfaces/provider/provider/KMeansNetworkProvider";
import {ProvidedNetworkOutputCache} from "../../../src/models/cache/ProvidedNetworkOutputCache";
import {NeuralNetInputData} from "../../../src/interfaces/input/NeuralNetInputData";
import {UnsupervisedNetworkTrainingResult} from "../../../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {UnsupervisedProvidedNetwork} from "../../../src/interfaces/provider/network/UnsupervisedProvidedNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {SomeCoolNetworkOutput} from "./SomeCoolNetworkOutput";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";

let ucwords = require("ucwords");

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork, OutputCacher<SomeCoolNetworkOutput> {

    private _networkProvider: KMeansNetworkProvider;
    private _market: Market;
    private _cache: ProvidedNetworkOutputCache<SomeCoolNetworkOutput>;

    constructor(market: Market, provider: KMeansNetworkProvider) {
        this._market = market;
        this._networkProvider = provider;

        // Cache will cache your results.
        // This is used 2 reasons.
        // 1. It could improve the performance of your guesses
        // 2. When using the network in a backtest as part of a training session you may need the output to be predetermined
        this._cache = new ProvidedNetworkOutputCache<SomeCoolNetworkOutput>();
    }

    public train(input: NeuralNetInputData<SomeCoolNetworkInput>): Promise<UnsupervisedNetworkTrainingResult> {
        // For a n unsupervised network a data set that is a list of inputs must be provided
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.trainUnsupervisedNetwork(input);
            });
    }

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        // For unsupervised network a training session must be scored.
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return network.scoreTrainingResult(resultID, score);
            })
    }

    public guess(input: SomeCoolNetworkInput): Promise<SomeCoolNetworkOutput> {
        // This will make a guess from the neural network based on the inputs
        // If the cache is enabled the cached results based on the inputs will be used
        return this._getNetwork()
            .then((network: UnsupervisedProvidedNetwork) => {
                return this._cache.guess(network, input);
            });
    }

    public setOutputsForInputs(inputs: SomeCoolNetworkInput[], outputs: SomeCoolNetworkOutput[]) {
        // This will clear and update the cache.
        // The number of inputs should match the number of outputs exactly
        // This is not for training. This is for setting predetermined results of the this.guess(...) method
        return this._cache.setOutputsForInputs(inputs, outputs);
    }

    private _getNetwork(): Promise<UnsupervisedProvidedNetwork> {
        // This will return a ProvidedNetwork object that allows you to interact with the network on the remote service
        return this._networkProvider.getKMeansNetwork(SomeCoolNetworkOutput, this._getNetworkName());
    }

    private _getNetworkName(): string {
        // This is just a way of creating a unique network name specific based on what is unique about the network
        // In this case the Market aspects and the class name
        // Some network providers like Amazon SageMaker prohibit spaces so it is advisable to return a name without spaces here
        return ucwords([
            this.constructor.name,
            this._market.getExchangeKey(),
            this._market.getBaseKey(),
            this._market.getAssetKey()
        ].join(' ')).split(' ').join('');
    }

}
```

2. An input class. This class is the structure that the neural network expects in or to make a guess and / or train the network.

[embedmd]:# (../../../examples/network/cool/SomeCoolNetworkInput.ts typescript)
```typescript
import {NeuralNetInput} from "../../../src/interfaces/input/NeuralNetInput";

export class SomeCoolNetworkInput implements NeuralNetInput {

	private _a: string;
	private _b: number;
	private _c: number;

	constructor(a: string, b: number, c: number) {
		this._a = a;
		this._b = b;
		this._c = c;
	}

	getUniqueID(): string {
		return this.getInput().join('_');
	}

	getInput(): any[] {
		return [this._a, this._b, this._c];
	}
}
```

3. An output class. This is the data that the network will the return when the network makes a guess.

[embedmd]:# (../../../examples/network/cool/SomeCoolNetworkOutput.ts typescript)
```typescript
import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";

export class SomeCoolNetworkOutput implements NeuralNetOutput {
    
    private _a: number;
    private _b: string;

    constructor(output: any[]) {
        this._a = output[0];
        this._b = output[1];
    }

    get a(): number {
        return this._a;
    }

    get b(): string {
        return this._b;
    }
}
```

#### Supervised network
TODO
