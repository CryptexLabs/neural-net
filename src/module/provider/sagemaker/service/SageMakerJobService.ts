import {inject, injectable} from "inversify";
import {SageMakerNeuralNetConfig} from "../../../../interface/NeuralNetConfig";
import {NetworkDescription} from "../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../../../../interface/provider/sagemaker/SageMakerNetworkDescription";

@injectable()
export class SageMakerJobService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

}