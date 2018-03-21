import {DefaultNetworkProvider} from "../interface/provider/provider/DefaultNetworkProvider";
import {SageMakerNetworkProvider} from "../module/provider/sagemaker/models/SageMakerNetworkProvider";
import {NeuralNetConfig} from "../interface/NeuralNetConfig";
import {Container} from "inversify";

export module NeuralNetService {

    export class Service {

        private _context: Container;

        public constructor(config: NeuralNetConfig) {

            this._context = new Container();

            // Config
            this._context.bind<NeuralNetConfig>("Config").toConstantValue(config).whenTargetIsDefault();

            // Network providers
            this._context.bind<SageMakerNetworkProvider>(SageMakerNetworkProvider).toSelf().inSingletonScope();
        }

        public getDefaultProvider(): DefaultNetworkProvider {
            return this.getSageMakerNetworkProvider();
        }

        public getSageMakerNetworkProvider(): SageMakerNetworkProvider {
            return this._context.get(SageMakerNetworkProvider);
        }
    }
}
