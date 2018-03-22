import {inject, injectable} from "inversify";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescriptor";
import {SageMaker} from "aws-sdk";
import {SageMakerEnvironmentHelper} from "../../helper/SageMakerEnvironmentHelper";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerModelService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Assistant")
    private _assistant: SageMakerNetworkDescriptor & NetworkDescriptor;

    private _model: SageMaker.DescribeModelOutput;

    public getModel(): Promise<SageMaker.DescribeModelOutput> {

        if(this._model){
           return Promise.resolve(this._model);
        }else{

            let sagemaker = new SageMaker();

            let describeModelInput: SageMaker.DescribeModelInput = {
                ModelName: this._assistant.getUniqueName()
            };

            return sagemaker.describeModel(describeModelInput).promise()
        }
    }

    public createModel(): Promise<SageMaker.CreateModelOutput> {

        let sagemaker = new SageMaker();

        let createModelInput: SageMaker.CreateModelInput = {
            ExecutionRoleArn: this._config.roleARN,
            ModelName: this._assistant.getUniqueName(),
            PrimaryContainer: {
                Image: this._assistant.getContainerImage(),
                ModelDataUrl: this._assistant.getModelDataUrl()
            },
            Tags: [SageMakerEnvironmentHelper.getAWSEnvironmentTag()]
        };

        return sagemaker
            .createModel(createModelInput).promise();
    }


}