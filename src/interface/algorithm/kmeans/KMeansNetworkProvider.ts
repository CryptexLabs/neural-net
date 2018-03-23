
import {KMeansProvidedNetwork} from "./KMeansProvidedNetwork";

export interface KMeansNetworkProvider {
    getKMeansNetwork(uniqueName: string): Promise<KMeansProvidedNetwork>;
}