import {SupervisedProvidedNetwork} from "./SupervisedProvidedNetwork";

export interface UnsupervisedNetworkProvider {
    getSupervisedNetwork(): Promise<SupervisedProvidedNetwork>;
}