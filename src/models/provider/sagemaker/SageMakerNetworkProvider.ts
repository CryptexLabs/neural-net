import {SageMakerNetwork} from "./SageMakerNetwork";
import {SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
import {SageMaker} from "aws-sdk";
import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../interfaces/provider/provider/KMeansNetworkProvider";
import {SageMakerConfigNetworkDescription} from "./description/SageMakerConfigNetworkDescription";
import {SageMakerInferenceImageAlgorithm} from "../../../interfaces/provider/sagemaker/SageMakerInferenceImageDescriptions";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/network/SupervisedProvidedNetwork";
import {ProvidedNetworkCache} from "../../cache/ProvidedNetworkCache";
import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";
import {NewableOutput} from "../../../interfaces/output/NewableOutput";
import {NetworkMultiVariantDescriptor} from "../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkDescription} from "../../../interfaces/description/NetworkDescription";
import {NeuralNet} from "../../../interfaces/NeuralNet";
import {SageMakerProductionVariantInstanceType} from "../../../interfaces/provider/sagemaker/SageMakerProductionVariantInstanceType";
import {SageMakerNetworkDescriptor} from "../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {ServiceNetworkProvider} from "../../../interfaces/provider/provider/ServiceNetworkProvider";
import {DefaultSageMakerNetworkMultiVariantDescription} from "./description/DefaultSageMakerNetworkMultiVariantDescription";
import {NeuralNetServiceContext} from "../../../interfaces/NeuralNetServiceContext";
import {MultiVariantNetwork} from "../../../interfaces/provider/network/MultiVariantNetwork";

declare let AWS;

interface D extends NetworkDescription, SageMakerNetworkDescriptor {
}

interface N extends NeuralNet, UnsupervisedProvidedNetwork, SupervisedProvidedNetwork, MultiVariantNetwork {
}

export class SageMakerNetworkProvider implements ServiceNetworkProvider<D>, KMeansNetworkProvider {

    private _config: SageMakerNeuralNetConfig;
    private _cache: ProvidedNetworkCache<SageMakerNetworkProvider, N, D>;
    private _sageMaker: SageMaker;
    private _instanceType: SageMakerProductionVariantInstanceType;
    private _multiVariantDescriptor: NetworkMultiVariantDescriptor;
    private _serviceContext: NeuralNetServiceContext;

    constructor(serviceContext: NeuralNetServiceContext, config: SageMakerNeuralNetConfig) {
        this._config = config;
        this._cache = new ProvidedNetworkCache<SageMakerNetworkProvider, N, D>(this);
        this._sageMaker = new AWS.SageMaker();
        this._instanceType = SageMakerProductionVariantInstanceType.ml_t2_medium;
        this._multiVariantDescriptor = new DefaultSageMakerNetworkMultiVariantDescription();
        this._serviceContext = serviceContext;
    }

    public getKMeanMultiVariantNetwork(outputClass: NewableOutput<NeuralNetOutput>, name: string, variantDescriptor: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        let description = new SageMakerConfigNetworkDescription(
            name,
            AWS.config.region,
            SageMakerInferenceImageAlgorithm.kmeans,
            outputClass
        );
        return this._getNetwork(description)
            .then((network: N) => {
                network.setMultiVariantDescriptor(variantDescriptor);
                return network;
            });
    }

    public getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, name: string): Promise<UnsupervisedProvidedNetwork> {

        let description = new SageMakerConfigNetworkDescription(
            name,
            AWS.config.region,
            SageMakerInferenceImageAlgorithm.kmeans,
            outputClass
        );

        return this.getUnsupervisedNetwork(description);
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

    private _getNetwork(description: NetworkDescription & SageMakerNetworkDescriptor): Promise<N> {
        return this._cache.getNetwork(description);
    }

    public getProvidedNetwork(description: D): Promise<NeuralNet> {
        let network = new SageMakerNetwork(description, this._instanceType);
        return Promise.resolve(network);
    }
}