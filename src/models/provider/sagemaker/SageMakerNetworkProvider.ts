import {SageMakerNetwork} from "./SageMakerNetwork";
import {SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
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
import {injectable, interfaces} from "inversify";
import Container = interfaces.Container;

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

    private _config: SageMakerNeuralNetConfig;
    private _context: Container;
    private _cache: ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>;

    constructor() {
        this._cache = new ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>(this);
    }

    public init(context: Container, config: SageMakerNeuralNetConfig) {
        this._config = config;
        this._context = context;
        return this;
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
        return Promise.resolve(new SageMakerNetwork(this._config, description));
    }

    private _getNetwork(description: NetworkDescription & SageMakerNetworkDescriptor): Promise<N> {
        return this._cache.getNetwork(description);
    }
}