import {NetworkDescription} from "../../description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "./SageMakerNetworkDescription";
import {SupervisedProvidedNetwork} from "../network/SupervisedProvidedNetwork";

export interface SageMakerSupervisedNetworkProvider {
    getSupervisedNetwork(description: SageMakerNetworkDescriptor & NetworkDescription): Promise<SupervisedProvidedNetwork>;
}