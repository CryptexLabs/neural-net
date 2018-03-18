import {UnsupervisedProvidedNetwork} from "./UnsupervisedProvidedNetwork";

export interface KMeansNetworkProvider {
    getKMeansNetwork(uniqueName: string): Promise<UnsupervisedProvidedNetwork>;
}