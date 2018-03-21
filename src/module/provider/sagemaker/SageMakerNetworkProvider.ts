import {SageMakerNetwork} from "./SageMakerNetwork";
import {NeuralNetConfig, SageMakerNeuralNetConfig} from "../../../interface/NeuralNetConfig";
import {UnsupervisedProvidedNetwork} from "../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../interface/provider/provider/kmeans/KMeansNetworkProvider";
import {SupervisedProvidedNetwork} from "../../../interface/provider/network/SupervisedProvidedNetwork";
import {ProvidedNetworkCache} from "../../../model/cache/ProvidedNetworkCache";
import {NeuralNetOutput} from "../../../interface/output/NeuralNetOutput";
import {NewableOutput} from "../../../interface/output/NewableOutput";
import {NetworkMultiVariantDescriptor} from "../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkDescription} from "../../../interface/description/NetworkDescription";
import {NeuralNet} from "../../../interface/NeuralNet";
import {SageMakerNetworkDescriptor} from "../../../interface/provider/sagemaker/SageMakerNetworkDescription";
import {ServiceNetworkProvider} from "../../../interface/provider/provider/ServiceNetworkProvider";
import {MultiVariantNetwork} from "../../../interface/provider/network/MultiVariantNetwork";
import {KMeansMultiVariantNetworkProvider} from "../../../interface/provider/provider/kmeans/KMeansMultiVariantNetworkProvider";
import {SageMakerKMeansNetworkProvider} from "./provider/SageMakerKMeansNetworkProvider";
import {SageMakerUnsupervisedNetworkProvider} from "../../../interface/provider/sagemaker/SageMakerUnsupervisedNetworkProvider";
import {SageMakerSupervisedNetworkProvider} from "../../../interface/provider/sagemaker/SageMakerSupervisedNetworkProvider";
import {Container, inject, injectable} from "inversify";
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

    private _config: SageMakerNeuralNetConfig;

    private _context: Container;

    private _cache: ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>;

    constructor(@inject("Config") config: NeuralNetConfig) {

        this._cache = new ProvidedNetworkCache<ServiceNetworkProvider<D>, N, D>(this);
        this._config = config.amazon.sagemaker;

        this._context = new Container();
        this._context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(this._config);
        this._context.bind<SageMakerUnsupervisedNetworkProvider>("ServiceProvider").toConstantValue(this).whenTargetIsDefault();

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
        return this._context.get(SageMakerKMeansNetworkProvider);
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