import {KMeansMultiVariantNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansMultiVariantNetworkProvider";
import {KMeansNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {inject, injectable} from "inversify";
import {DefaultSageMakerNetworkMultiVariantDescription} from "../description/DefaultSageMakerNetworkMultiVariantDescription";
import {SageMakerInferenceImageAlgorithm} from "../../interface/description/SageMakerInferenceImageDescriptions";
import {SageMakerConfigNetworkDescription} from "../description/SageMakerConfigNetworkDescription";
import {NeuralNet} from "../../../../../interface/NeuralNet";
import {SageMakerUnsupervisedNetworkProvider} from "../../interface/provider/SageMakerUnsupervisedNetworkProvider";
import {SageMakerKMeansOutputDeserializer} from "../../interface/algorithm/kmeans/output/SageMakerKMeansOutputDeserializer";
import {KMeansNeuralNetOutput} from "../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {SageMakerKMeansNeuralNetOutput} from "../output/kmeans/SageMakerKMeansNeuralNetOutput";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";
import {SageMakerKMeansInputSerializer} from "../../interface/algorithm/kmeans/input/SageMakerKMeansInputSerializer";
import {SageMakerKMeansInput} from "../../interface/algorithm/kmeans/input/SageMakerKMeansInput";

interface N extends
    NeuralNet,
    UnsupervisedProvidedNetwork,
    MultiVariantNetwork {
}

@injectable()
export class SageMakerKMeansNetworkProvider implements KMeansNetworkProvider, KMeansMultiVariantNetworkProvider, SageMakerKMeansOutputDeserializer, SageMakerKMeansInputSerializer {

    @inject(DefaultSageMakerNetworkMultiVariantDescription)
    private _multiVariantDescriptor: NetworkMultiVariantDescriptor;

    @inject("ServiceProvider")
    private _provider: SageMakerUnsupervisedNetworkProvider;

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    public getKMeansNetwork(uniqueName: string): Promise<UnsupervisedProvidedNetwork> {
        let description = this._getDefaultDescription(uniqueName);

        return this._provider.getUnsupervisedNetwork(description);
    }

    public getKMeanMultiVariantNetwork(uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        let description = this._getDefaultDescription(uniqueName);

        return this._provider.getUnsupervisedNetwork(description)
            .then((network: N) => {
                network.setMultiVariantDescriptor(variant);
                return network;
            });
    }

    private _getDefaultDescription(uniqueName: string) {
        return new SageMakerConfigNetworkDescription(
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

}