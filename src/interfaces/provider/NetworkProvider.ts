import {ProvidedNetwork} from "./ProvidedNetwork";

export interface NetworkProvider {
    getNetwork(): ProvidedNetwork;
}