import {SageMakerEndpointConfigService} from "./SageMakerEndpointConfigService";
import {MultiVariantNetwork} from "../../../../interfaces/provider/network/MultiVariantNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {NeuralNetOutput} from "../../../../interfaces/output/NeuralNetOutput";
import {SageMaker} from "aws-sdk";
import {SageMakerNetworkDescriptor} from "../../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {NetworkDescription} from "../../../../interfaces/description/NetworkDescription";
import {SageMakerEnvironmentHelper} from "../helpers/SageMakerEnvironmentHelper";
import {SageMakerNeuralNetConfig} from "../../../../interfaces/NeuralNetConfig";

export class SageMakerEndpointService implements MultiVariantNetwork {

    private _endPointConfigService: SageMakerEndpointConfigService;
    private _description: NetworkDescription & SageMakerNetworkDescriptor;
    private _endpointDescription: SageMaker.DescribeEndpointOutput;
    private _config: SageMakerNeuralNetConfig;

    constructor(config: SageMakerNeuralNetConfig, description: NetworkDescription & SageMakerNetworkDescriptor) {
        this._config = config;
        this._description = description;
        this._endPointConfigService = new SageMakerEndpointConfigService(config, description.getUniqueName());
    }

    public setMultiVariantDescriptor(descriptor: NetworkMultiVariantDescriptor) {
        this._endPointConfigService.setMultiVariantDescriptor(descriptor);
    }

    public getEndpoint(): Promise<SageMaker.DescribeEndpointOutput> {
        if (this._endpointDescription) {
            return Promise.resolve(this._endpointDescription);
        } else {
            let sagemaker = new SageMaker();
            let input: SageMaker.DescribeEndpointInput = {
                EndpointName: this._description.getUniqueName()
            };
            return sagemaker
                .describeEndpoint(input).promise()
                .catch(this._createEndpoint)
                .then((output: SageMaker.CreateEndpointOutput) => {
                    return sagemaker.describeEndpoint(input).promise();
                });
        }
    }

    public getOutputForEndpoint(endpoint: SageMaker.DescribeEndpointOutput): Promise<NeuralNetOutput> {
        // TODO Implement SageMakerNetwork::_getOutputForEndpoint
        return Promise.resolve(this._description.getNewOutput([]));
    }

    private _createEndpoint(): Promise<SageMaker.CreateEndpointOutput> {
        return this._endPointConfigService.getEndpointConfig()
            .then((config: SageMaker.DescribeEndpointConfigOutput) => {
                return this._createEndpointWithConfig(config)
            });
    }

    private _createEndpointWithConfig(config: SageMaker.DescribeEndpointConfigOutput): Promise<SageMaker.CreateEndpointOutput> {

        let sagemaker = new SageMaker();
        let input: SageMaker.CreateEndpointInput = {
            EndpointName: this._description.getUniqueName(),
            EndpointConfigName: '',
            Tags: [SageMakerEnvironmentHelper.getAWSEnvironmentTag()]
        };

        return sagemaker.createEndpoint(input).promise();
    }

}