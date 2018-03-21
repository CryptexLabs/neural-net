import {inject, injectable} from "inversify";
import {SageMakerNetworkDescriptor} from "../../../../interface/provider/sagemaker/SageMakerNetworkDescription";
import {SageMaker} from "aws-sdk";
import {SageMakerEnvironmentHelper} from "../../../../helper/provider/sagemaker/SageMakerEnvironmentHelper";
import {SageMakerNeuralNetConfig} from "../../../../interface/NeuralNetConfig";
import {NetworkDescription} from "../../../../interface/description/NetworkDescription";

@injectable()
export class SageMakerModelService {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

    private getModel(): Promise<SageMaker.DescribeModelOutput> {

        let sagemaker = new SageMaker();

        let describeModelInput: SageMaker.DescribeModelInput = {
            ModelName: this._description.getUniqueName()
        };

        return sagemaker
            .describeModel(describeModelInput).promise()
            .catch(() => {
                return this._getNetworkFromNewModel()
            })
            .then(() => {
                return sagemaker.describeModel(describeModelInput).promise()
            })
    }

    private _getNetworkFromNewModel(): Promise<SageMaker.CreateModelOutput> {

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