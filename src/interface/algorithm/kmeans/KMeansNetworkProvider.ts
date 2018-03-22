import {UnsupervisedProvidedNetwork} from "../../provider/network/UnsupervisedProvidedNetwork";
import {NeuralNetOutput} from "../../output/NeuralNetOutput";
import {NewableOutput} from "../../output/NewableOutput";

export interface KMeansNetworkProvider {
    getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string): Promise<UnsupervisedProvidedNetwork>;
}