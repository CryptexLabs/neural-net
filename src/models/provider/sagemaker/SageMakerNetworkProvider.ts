import {SageMakerNetwork} from "./SageMakerNetwork";
import {NeuralNetConfig, SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../interfaces/provider/provider/kmeans/KMeansNetworkProvider";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/network/SupervisedProvidedNetwork";
import {ProvidedNetworkCache} from "../../cache/ProvidedNetworkCache";
import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";
import {NewableOutput} from "../../../interfaces/output/NewableOutput";
import {NetworkMultiVariantDescriptor} from "../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkDescription} from "../../../interfaces/description/NetworkDescription";
import {NeuralNet} from "../../../interfaces/NeuralNet";
import {SageMakerNetworkDescriptor} from "../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {ServiceNetworkProvider} from "../../../interfaces/provider/provider/ServiceNetworkProvider";
import {MultiVariantNetwork} from "../../../interfaces/provider/network/MultiVariantNetwork";
import {KMeansMultiVariantNetworkProvider} from "../../../interfaces/provider/provider/kmeans/KMeansMultiVariantNetworkProvider";
import {SageMakerKMeansNetworkProvider} from "./provider/SageMakerKMeansNetworkProvider";
import {SageMakerUnsupervisedNetworkProvider} from "../../../interfaces/provider/sagemaker/SageMakerUnsupervisedNetworkProvider";
import {SageMakerSupervisedNetworkProvider} from "../../../interfaces/provider/sagemaker/SageMakerSupervisedNetworkProvider";
import {inject, injectable, Container} from "inversify";
import {DefaultSageMakerNetworkMultiVariantDescription} from "./description/DefaultSageMakerNetworkMultiVariantDescription";

// Required network descriptors
interface D extends
    NetworkDescription,
    SageMakerNetworkDescriptor
{}

// Supported network algorithm types
interface N extends
    NeuralNet,
    UnsupervisedProvidedNetwork,
    SupervisedProvidedNetwork,
    MultiVariantNetwork
{}

// Supported algorithms
interface A extends
    KMeansNetworkProvider,
    KMeansMultiVariantNetworkProvider {
}

// Supported algorithm types
interface P extends
    SageMakerUnsupervisedNetworkProvider,
    SageMakerSupervisedNetworkProvider
{}

@injectable()
export class SageMakerNetworkProvider implements ServiceNetworkProvider<D>, A, P {

    private _config: NeuralNetConfig;

    private _context: Container;

    private _cache: ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>;

    constructor(
        @inject("Container") container: Container,
        @inject("Config") config: NeuralNetConfig) {
        this._cache = new ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>(this);
        this._config = config;

        this._context = new Container();
        this._context.bind<SageMakerNetwork>(SageMakerNetwork).to(SageMakerNetwork);
        this._context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(config.amazon.sagemaker);
        this._context.bind<DefaultSageMakerNetworkMultiVariantDescription>(DefaultSageMakerNetworkMultiVariantDescription).toSelf().inSingletonScope();
        this._context.bind<SageMakerKMeansNetworkProvider>(SageMakerKMeansNetworkProvider).toSelf().inSingletonScope();
    }

    public getKMeanMultiVariantNetwork(outputClass: NewableOutput<NeuralNetOutput>, name: string, variantDescriptor: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        return this._getKMeansProvider().getKMeanMultiVariantNetwork(outputClass, name, variantDescriptor);
    }

    public getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, name: string): Promise<UnsupervisedProvidedNetwork> {
        return this._getKMeansProvider().getKMeansNetwork(outputClass, name);
    }

    private _getKMeansProvider(): SageMakerKMeansNetworkProvider {
        return this._context.get(SageMakerKMeansNetworkProvider).init(this);
    }

    public getSupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<SupervisedProvidedNetwork> {
        return this._getNetwork(description);
    }

    public getUnsupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<UnsupervisedProvidedNetwork> {
        return this._getNetwork(description);
    }

    public getNetwork(description: D): Promise<NeuralNet> {
        return this._getNetwork(description);
    }

    public getProvidedNetwork(description: D): Promise<NeuralNet> {
        let network = this._context.get(SageMakerNetwork);
        network.init(description);
        return Promise.resolve(network);
    }

    private _getNetwork(description: NetworkDescription & SageMakerNetworkDescriptor): Promise<N> {
        return this._cache.getNetwork(description);
    }
}