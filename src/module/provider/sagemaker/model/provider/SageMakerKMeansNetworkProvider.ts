import {KMeansMultiVariantNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansMultiVariantNetworkProvider";
import {KMeansNetworkProvider} from "../../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {NewableOutput} from "../../../../../interface/output/NewableOutput";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";
import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {inject, injectable} from "inversify";
import {DefaultSageMakerNetworkMultiVariantDescription} from "../description/DefaultSageMakerNetworkMultiVariantDescription";
import {SageMakerInferenceImageAlgorithm} from "../../interface/description/SageMakerInferenceImageDescriptions";
import {SageMakerConfigNetworkDescription} from "../description/SageMakerConfigNetworkDescription";
import {NeuralNet} from "../../../../../interface/NeuralNet";
import {SageMakerUnsupervisedNetworkProvider} from "../../interface/provider/SageMakerUnsupervisedNetworkProvider";

interface N extends
    NeuralNet,
    UnsupervisedProvidedNetwork,
    MultiVariantNetwork {
}

@injectable()
export class SageMakerKMeansNetworkProvider implements KMeansNetworkProvider, KMeansMultiVariantNetworkProvider {

    @inject(DefaultSageMakerNetworkMultiVariantDescription)
    private _multiVariantDescriptor: NetworkMultiVariantDescriptor;

    @inject("ServiceProvider")
    private _provider: SageMakerUnsupervisedNetworkProvider;

    public getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string): Promise<UnsupervisedProvidedNetwork> {
        let description = this._getDefaultDescription(uniqueName, outputClass);

        return this._provider.getUnsupervisedNetwork(description);
    }

    public getKMeanMultiVariantNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        let description = this._getDefaultDescription(uniqueName, outputClass);

        return this._provider.getUnsupervisedNetwork(description)
            .then((network: N) => {
                network.setMultiVariantDescriptor(variant);
                return network;
            });
    }

    private _getDefaultDescription(uniqueName: string, outputClass: NewableOutput<NeuralNetOutput>) {
        return new SageMakerConfigNetworkDescription(
            uniqueName,
            AWS.config.region,
            SageMakerInferenceImageAlgorithm.kmeans,
            outputClass
        );
    }

}