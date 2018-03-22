import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../description/SageMakerNetworkDescription";

export interface SageMakerUnsupervisedNetworkProvider {
    getUnsupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<UnsupervisedProvidedNetwork>;
}