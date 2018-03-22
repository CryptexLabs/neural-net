import {inject, injectable} from "inversify";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescription";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerJobService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

}