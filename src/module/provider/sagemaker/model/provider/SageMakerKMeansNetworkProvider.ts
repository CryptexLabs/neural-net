import {KMeansMultiVariantNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansMultiVariantNetworkProvider";
import {KMeansNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {inject, injectable} from "inversify";
import {DefaultSageMakerNetworkMultiVariantDescription} from "../description/DefaultSageMakerNetworkMultiVariantDescription";
import {SageMakerInferenceImageAlgorithm} from "../../interface/description/SageMakerInferenceImageDescriptions";
import {NeuralNet} from "../../../../../interface/NeuralNet";
import {SageMakerKMeansOutputDeserializer} from "../../interface/algorithm/kmeans/output/SageMakerKMeansOutputDeserializer";
import {KMeansNeuralNetOutput} from "../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {SageMakerKMeansNeuralNetOutput} from "../output/kmeans/SageMakerKMeansNeuralNetOutput";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";
import {SageMakerKMeansInputSerializer} from "../../interface/algorithm/kmeans/input/SageMakerKMeansInputSerializer";
import {SageMakerKMeansInput} from "../../interface/algorithm/kmeans/input/SageMakerKMeansInput";
import {KMeansProvidedNetwork} from "../../../../../interface/algorithm/kmeans/KMeansProvidedNetwork";
import {ProvidedNetworkCache} from "../../../../../model/cache/ProvidedNetworkCache";
import {ServiceNetworkProvider} from "../../../../../interface/provider/provider/ServiceNetworkProvider";
import {SageMakerNetworkAssistant} from "../../interface/assistant/SageMakerNetworkAssistant";
import {SageMakerConfiguredNetworkAssistant} from "../description/SageMakerConfiguredNetworkAssistant";

interface Assistant extends SageMakerNetworkAssistant<KMeansNeuralNetOutput> {}

interface Network extends KMeansProvidedNetwork,
    MultiVariantNetwork {
}

interface N extends NeuralNet,
    UnsupervisedProvidedNetwork,
    MultiVariantNetwork {
}

@injectable()
export class SageMakerKMeansNetworkProvider implements ServiceNetworkProvider<Assistant>, KMeansNetworkProvider, KMeansMultiVariantNetworkProvider, SageMakerKMeansOutputDeserializer, SageMakerKMeansInputSerializer {

    @inject(DefaultSageMakerNetworkMultiVariantDescription)
    private _multiVariantDescriptor: NetworkMultiVariantDescriptor;

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    private _cache: ProvidedNetworkCache<ServiceNetworkProvider<Assistant>, Network, Assistant>;

    constructor() {
        this._cache = new ProvidedNetworkCache<ServiceNetworkProvider<Assistant>, Network, Assistant>(this);
    }

    public getKMeansNetwork(uniqueName: string): Promise<KMeansProvidedNetwork> {
        let assistant = this._getDefaultDescription(uniqueName);

        return this._getNetwork(assistant);
    }

    public getKMeanMultiVariantNetwork(uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        let assistant = this._getDefaultDescription(uniqueName);

        return this._getNetwork(assistant)
            .then((network: N) => {
                network.setMultiVariantDescriptor(variant);
                return network;
            });
    }

    private _getDefaultDescription(uniqueName: string): Assistant {
        return new SageMakerConfiguredNetworkAssistant<KMeansNeuralNetOutput>(
            uniqueName,
            this._config.region,
            SageMakerInferenceImageAlgorithm.kmeans,
            this, this
        );
    }

    public deserialize(data: any): KMeansNeuralNetOutput {
        return new SageMakerKMeansNeuralNetOutput(data);
    }

    public serialize(input: SageMakerKMeansInput): any {
        return JSON.stringify(input.getInput());
    }

    private _getNetwork(assistant: Assistant): Promise<Network> {
        return this._cache.getNetwork(assistant);
    }

    public getProvidedNetwork(assistant: Assistant): Promise<Network> {
        return undefined;
        // return Promise.resolve(new SageMakerNetwork(this._config, assistant));
    }

}