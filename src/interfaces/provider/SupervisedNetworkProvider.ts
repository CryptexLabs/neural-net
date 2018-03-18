import {NetworkDescription} from "../description/NetworkDescription";
import {SupervisedProvidedNetwork} from "./SupervisedProvidedNetwork";

export interface SupervisedNetworkProvider {
    getSupervisedNetwork(description: NetworkDescription): Promise<SupervisedProvidedNetwork>;
}