import {UnsupervisedProvidedNetwork} from "../../provider/network/UnsupervisedProvidedNetwork";
import {NetworkMultiVariantDescriptor} from "../../provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../provider/network/MultiVariantNetwork";

export interface KMeansMultiVariantNetworkProvider {
    getKMeanMultiVariantNetwork(uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork>;
}