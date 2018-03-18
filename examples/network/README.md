[//]: <> (Only edit this file if it is in $project/in directory. This file is compiled)
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
import {NeuralNetInput} from "../../../src/interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../src/interfaces/output/NeuralNetOutput";
import {UnsupervisedNetwork} from "../../../src/interfaces/unsupervised/UnsupervisedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../src/interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../src/interfaces/input/NeuralNetInputData";
import {SomeCoolNetworkInput} from "./SomeCoolNetworkInput";

export class SomeCoolNetwork implements NeuralNet, UnsupervisedNetwork {

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public  train(input: NeuralNetInputData<SomeCoolNetworkInput>): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        throw new Error('SomeCoolNetwork.guess not implemented')
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

    constructor(a: number, b: string) {
        this._a = a;
        this._b = b;
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
