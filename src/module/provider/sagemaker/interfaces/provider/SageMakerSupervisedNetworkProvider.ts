import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../description/SageMakerNetworkDescription";
import {SupervisedProvidedNetwork} from "../../../../../interface/provider/network/SupervisedProvidedNetwork";

export interface SageMakerSupervisedNetworkProvider {
    getSupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<SupervisedProvidedNetwork>;
}