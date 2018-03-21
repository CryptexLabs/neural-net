import {injectable} from "inversify";
import {SageMakerNetworkDescriptor} from "../../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {SageMaker} from "aws-sdk";
import {SageMakerEnvironmentHelper} from "../helpers/SageMakerEnvironmentHelper";
import {SageMakerNeuralNetConfig} from "../../../../interfaces/NeuralNetConfig";
import {NetworkDescription} from "../../../../interfaces/description/NetworkDescription";

@injectable()
export class SageMakerModelService {

    private _config: SageMakerNeuralNetConfig;
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

    constructor(config: SageMakerNeuralNetConfig, description: SageMakerNetworkDescriptor & NetworkDescription) {
        this._config = config;
        this._description = description;
    }

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