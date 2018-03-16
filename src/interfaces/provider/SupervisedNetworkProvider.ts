import {UnsupervisedProvidedNetwork} from "./UnsupervisedProvidedNetwork";

export interface SupervisedNetworkProvider {
    getUnsupervisedNetwork(): Promise<UnsupervisedProvidedNetwork>;
}