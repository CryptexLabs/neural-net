import {NeuralNetConfig} from "../../../../config/NeuralNetConfig";
import {UnsupervisedProvidedNetwork} from "../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {KMeansNetworkProvider} from "../../../../interface/algorithm/kmeans/KMeansNetworkProvider";
import {NetworkMultiVariantDescriptor} from "../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../../../interface/provider/network/MultiVariantNetwork";
import {KMeansMultiVariantNetworkProvider} from "../../../../interface/algorithm/kmeans/KMeansMultiVariantNetworkProvider";
import {SageMakerKMeansNetworkProvider} from "./provider/SageMakerKMeansNetworkProvider";
import {Container, inject, injectable} from "inversify";
import {SageMakerNeuralNetConfig} from "../interface/config/SageMakerNeuralNetConfig";
import {KMeansProvidedNetwork} from "../../../../interface/algorithm/kmeans/KMeansProvidedNetwork";

// Supported algorithms
interface SupportedNetworkProviders extends
    KMeansNetworkProvider,
    KMeansMultiVariantNetworkProvider {
}

@injectable()
export class SageMakerNetworkProvider implements SupportedNetworkProviders {

    private _context: Container;

    constructor(@inject("Config") config: NeuralNetConfig) {

        this._context = new Container();

        // Config
        this._context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(config.amazon.sagemaker);

        // Networks
        this._context.bind<SageMakerKMeansNetworkProvider>(SageMakerKMeansNetworkProvider).toSelf().inSingletonScope();
    }

    public getKMeanMultiVariantNetwork(name: string, variantDescriptor: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork> {
        return this._getKMeansProvider().getKMeanMultiVariantNetwork(name, variantDescriptor);
    }

    public getKMeansNetwork(name: string): Promise<KMeansProvidedNetwork> {
        return this._getKMeansProvider().getKMeansNetwork(name);
    }

    private _getKMeansProvider(): SageMakerKMeansNetworkProvider {
        return this._context.get(SageMakerKMeansNetworkProvider);
    }
}