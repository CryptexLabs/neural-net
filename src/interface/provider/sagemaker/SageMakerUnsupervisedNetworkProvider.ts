import {UnsupervisedProvidedNetwork} from "../network/UnsupervisedProvidedNetwork";
import {NetworkDescription} from "../../description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "./SageMakerNetworkDescription";

export interface SageMakerUnsupervisedNetworkProvider {
    getUnsupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<UnsupervisedProvidedNetwork>;
}