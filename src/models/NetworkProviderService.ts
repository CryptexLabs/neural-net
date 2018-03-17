import {DefaultNetworkProvider} from "../interfaces/provider/DefaultNetworkProvider";
import {SageMakerNetworkProvider} from "./provider/sagemaker/SageMakerNetworkProvider";

export class NetworkProviderService {

    private constructor() {}

    public static getDefaultProvider(): DefaultNetworkProvider {
        return new SageMakerNetworkProvider();
    }
}