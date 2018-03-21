import {inject, injectable} from "inversify";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../../interfaces/description/SageMakerNetworkDescription";
import {SageMakerNeuralNetConfig} from "../../interfaces/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerJobService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

}