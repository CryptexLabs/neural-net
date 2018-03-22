import {inject, injectable} from "inversify";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescription";
import {SageMaker} from "aws-sdk";
import {SageMakerEnvironmentHelper} from "../../helper/SageMakerEnvironmentHelper";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerModelService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

    private _model: SageMaker.DescribeModelOutput;

    public getModel(): Promise<SageMaker.DescribeModelOutput> {

        if(this._model){
           return Promise.resolve(this._model);
        }else{

            let sagemaker = new SageMaker();

            let describeModelInput: SageMaker.DescribeModelInput = {
                ModelName: this._description.getUniqueName()
            };

            return sagemaker.describeModel(describeModelInput).promise()
        }
    }

    public createModel(): Promise<SageMaker.CreateModelOutput> {

        let sagemaker = new SageMaker();

        let createModelInput: SageMaker.CreateModelInput = {
            ExecutionRoleArn: this._config.roleARN,
            ModelName: this._description.getUniqueName(),
            PrimaryContainer: {
                Image: this._description.getContainerImage(),
                ModelDataUrl: this._description.getModelDataUrl()
            },
            Tags: [SageMakerEnvironmentHelper.getAWSEnvironmentTag()]
        };

        return sagemaker
            .createModel(createModelInput).promise();
    }


}