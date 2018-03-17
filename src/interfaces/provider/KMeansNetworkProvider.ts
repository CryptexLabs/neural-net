import {UnsupervisedProvidedNetwork} from "./UnsupervisedProvidedNetwork";

export interface KMeansNetworkProvider {
    getKMeansNetwork(name: string): Promise<UnsupervisedProvidedNetwork>;
}