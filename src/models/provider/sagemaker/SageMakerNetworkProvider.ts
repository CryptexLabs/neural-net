import {SupervisedProvidedNetwork} from "../../../interfaces/provider/SupervisedProvidedNetwork";
import {UnsupervisedNetworkProvider} from "../../../interfaces/provider/UnsupervisedNetworkProvider";

export class SageMakerNetworkProvider implements UnsupervisedNetworkProvider {
    getSupervisedNetwork(): Promise<SupervisedProvidedNetwork> {
        throw new Error("Method not implemented.");
    }
}