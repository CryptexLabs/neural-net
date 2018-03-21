import {inject, injectable} from "inversify";
import {SageMakerNeuralNetConfig} from "../../../../interfaces/NeuralNetConfig";
import {NetworkDescription} from "../../../../interfaces/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";

@injectable()
export class SageMakerJobService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

}