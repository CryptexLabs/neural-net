import {UnsupervisedProvidedNetwork} from "../../provider/network/UnsupervisedProvidedNetwork";
import {NeuralNetOutput} from "../../output/NeuralNetOutput";
import {NewableOutput} from "../../output/NewableOutput";
import {NetworkMultiVariantDescriptor} from "../../provider/descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../../provider/network/MultiVariantNetwork";

export interface KMeansMultiVariantNetworkProvider {
    getKMeanMultiVariantNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork>;
}