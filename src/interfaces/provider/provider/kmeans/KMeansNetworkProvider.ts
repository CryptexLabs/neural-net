import {UnsupervisedProvidedNetwork} from "../../network/UnsupervisedProvidedNetwork";
import {NeuralNetOutput} from "../../../output/NeuralNetOutput";
import {NewableOutput} from "../../../output/NewableOutput";

export interface KMeansNetworkProvider {
    getKMeansNetwork(outputClass: NewableOutput<NeuralNetOutput>, uniqueName: string): Promise<UnsupervisedProvidedNetwork>;
}