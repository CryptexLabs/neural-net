import {UnsupervisedProvidedNetwork} from "../network/UnsupervisedProvidedNetwork";
import {NeuralNetOutput} from "../../output/NeuralNetOutput";
import {NewableOutput} from "../../output/NewableOutput";
import {NetworkMultiVariantDescriptor} from "../descriptor/NetworkMultiVariantDescriptor";
import {MultiVariantNetwork} from "../network/MultiVariantNetwork";

export interface KMeansNetworkProvider {
    getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string): Promise<UnsupervisedProvidedNetwork>;
    getKMeanMultiVariantNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string, variant: NetworkMultiVariantDescriptor): Promise<UnsupervisedProvidedNetwork & MultiVariantNetwork>;
}