import {SageMakerNetwork} from "./SageMakerNetwork";
import {NeuralNetConfig} from "../../../../config/NeuralNetConfig";
import {UnsupervisedProvidedNetwork} from "../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {SupervisedProvidedNetwork} from "../../../../interface/provider/network/SupervisedProvidedNetwork";
import {ProvidedNetworkCache} from "../../../../model/cache/ProvidedNetworkCache";
import {NetworkMultiVariantDescriptor} from "../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkDescriptor} from "../../../../interface/description/NetworkDescriptor";
import {NeuralNet} from "../../../../interface/NeuralNet";
import {SageMakerNetworkDescriptor} from "../interface/description/SageMakerNetworkDescriptor";
import {ServiceNetworkProvider} from "../../../../interface/provider/provider/ServiceNetworkProvider";
import {MultiVariantNetwork} from "../../../../interface/provider/network/MultiVariantNetwork";
import {KMeansMultiVariantNetworkProvider} from "../../../../interface/algorithm/kmeans/KMeansMultiVariantNetworkProvider";
import {SageMakerKMeansNetworkProvider} from "./provider/SageMakerKMeansNetworkProvider";
import {SageMakerUnsupervisedNetworkProvider} from "../interface/provider/SageMakerUnsupervisedNetworkProvider";
import {SageMakerSupervisedNetworkProvider} from "../interface/provider/SageMakerSupervisedNetworkProvider";
import {Container, inject, injectable} from "inversify";
import {DefaultSageMakerNetworkMultiVariantDescription} from "./description/DefaultSageMakerNetworkMultiVariantDescription";
import {SageMakerNeuralNetConfig} from "../interface/config/SageMakerNeuralNetConfig";
import {SageMakerIOTransformer} from "../interface/transform/SageMakerIOTransformer";

// Required network descriptors
interface A extends
    NetworkDescriptor,
    SageMakerNetworkDescriptor,
    SageMakerIOTransformer
{}

// Supported network algorithm types
interface N extends
    NeuralNet,
    UnsupervisedProvidedNetwork,
    SupervisedProvidedNetwork,
    MultiVariantNetwork
{}

// Supported algorithms
interface L extends
    KMeansNetworkProvider,
    KMeansMultiVariantNetworkProvider {
}

// Supported algorithm types
interface P extends
    SageMakerUnsupervisedNetworkProvider,
    SageMakerSupervisedNetworkProvider
{}

@injectable()
export class SageMakerNetworkProvider implements ServiceNetworkProvider<A>, L, P {

    private _config: SageMakerNeuralNetConfig;

    private _context: Container;

    private _cache: ProvidedNetworkCache<ServiceNetworkProvider<A>, N, A>;

    constructor(@inject("Config") config: NeuralNetConfig) {

        this._cache = new ProvidedNetworkCache<ServiceNetworkProvider<A>, N, A>(this);
        this._config = config.amazon.sagemaker;

        this._context = new Container();
        this._context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(this._config);
        this._context.bind<SageMakerUnsupervisedNetworkProvider>("ServiceProvider").toConstantValue(this).whenTargetIsDefault();

        this._context.bind<DefaultSageMakerNetworkMultiVariantDescription>(DefaultSageMakerNetworkMultiVariantDescription).toSelf().inSingletonScope();
        this._context.bind<SageMakerKMeansNetworkProvider>(SageMakerKMeansNetworkProvider).toSelf().inSingletonScope();
    }

    public getKMeanMultiVariantNetwork(name: string, variantDescriptor: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        return this._getKMeansProvider().getKMeanMultiVariantNetwork(name, variantDescriptor);
    }

    public getKMeansNetwork(name: string): Promise<UnsupervisedProvidedNetwork> {
        return this._getKMeansProvider().getKMeansNetwork(name);
    }

    private _getKMeansProvider(): SageMakerKMeansNetworkProvider {
        return this._context.get(SageMakerKMeansNetworkProvider);
    }

    public getSupervisedNetwork(assistant: A): Promise<SupervisedProvidedNetwork> {
        return this._getNetwork(assistant);
    }

    public getUnsupervisedNetwork(assistant: A): Promise<UnsupervisedProvidedNetwork> {
        return this._getNetwork(assistant);
    }

    public getNetwork(assistant: A): Promise<NeuralNet> {
        return this._getNetwork(assistant);
    }

    public getProvidedNetwork(assistant: A): Promise<NeuralNet> {
        return Promise.resolve(new SageMakerNetwork(this._config, assistant));
    }

    private _getNetwork(assistant: A): Promise<N> {
        return this._cache.getNetwork(assistant);
    }
}