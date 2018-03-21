import {DefaultNetworkProvider} from "../interfaces/provider/provider/DefaultNetworkProvider";
import {SageMakerNetworkProvider} from "./provider/sagemaker/SageMakerNetworkProvider";
import {NeuralNetConfig} from "../interfaces/NeuralNetConfig";
import {Container} from "inversify";
import {SageMakerNetworkProviderContextHelper} from "../helpers/provider/sagemaker/SageMakerNetworkProviderContextHelper";

export module NeuralNetService {

    export class Service {

        private _config: NeuralNetConfig;
        private _context: Container;

        public constructor(config: NeuralNetConfig) {
            this._config = config;
            this._initContexts();
        }

        private _initContexts() {
            this._context = new Container();

            // Sagemaker
            this._context.bind<SageMakerNetworkProvider>(SageMakerNetworkProvider).toSelf().inSingletonScope();
            this._context.bind<NeuralNetConfig>("Config").toConstantValue(this._config).whenTargetIsDefault();
            SageMakerNetworkProviderContextHelper.bindContext(this._context);
        }

        public getDefaultProvider(): DefaultNetworkProvider {
            return this.getSageMakerNetworkProvider();
        }

        public getSageMakerNetworkProvider(): SageMakerNetworkProvider {
            return this._context.get(SageMakerNetworkProvider).init(this._context);
        }
    }
}
