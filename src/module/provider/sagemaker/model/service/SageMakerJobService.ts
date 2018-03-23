import {inject, injectable} from "inversify";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescriptor";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerJobService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Assistant")
    private _assistant: SageMakerNetworkDescriptor & NetworkDescriptor;

}