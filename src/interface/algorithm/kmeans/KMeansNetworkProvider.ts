import {UnsupervisedProvidedNetwork} from "../../provider/network/UnsupervisedProvidedNetwork";

export interface KMeansNetworkProvider {
    getKMeansNetwork(uniqueName: string): Promise<UnsupervisedProvidedNetwork>;
}