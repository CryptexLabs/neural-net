import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerNetworkDescriptor} from "../description/SageMakerNetworkDescriptor";
import {SupervisedProvidedNetwork} from "../../../../../interface/provider/network/SupervisedProvidedNetwork";

export interface SageMakerSupervisedNetworkProvider {
    getSupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescriptor): Promise<SupervisedProvidedNetwork>;
}