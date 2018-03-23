import {UnsupervisedProvidedNetwork} from "../../../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerNetworkDescriptor} from "../description/SageMakerNetworkDescriptor";

export interface SageMakerUnsupervisedNetworkProvider {
    getUnsupervisedNetwork<N extends UnsupervisedProvidedNetwork>(description: SageMakerNetworkDescriptor & NetworkDescriptor): Promise<N>;
}