import {UnsupervisedProvidedNetwork} from "./UnsupervisedProvidedNetwork";

export interface UnsupervisedNetworkProvider {
    getUnsupervisedNetwork(name: string): Promise<UnsupervisedProvidedNetwork>;
}