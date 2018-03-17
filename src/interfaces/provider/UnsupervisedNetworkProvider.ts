import {UnsupervisedProvidedNetwork} from "./UnsupervisedProvidedNetwork";
import {NetworkDescription} from "../description/NetworkDescription";

export interface UnsupervisedNetworkProvider {
    getUnsupervisedNetwork(description: NetworkDescription): Promise<UnsupervisedProvidedNetwork>;
}