import {SageMakerEndpointConfigService} from "./SageMakerEndpointConfigService";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";
import {SageMaker} from "aws-sdk";
import {SageMakerNetworkDescriptor} from "../../interfaces/description/SageMakerNetworkDescription";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerEnvironmentHelper} from "../../../../../helper/provider/sagemaker/SageMakerEnvironmentHelper";
import {Container, inject, injectable} from "inversify";
import {SageMakerNeuralNetConfig} from "../../interfaces/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerEndpointService implements MultiVariantNetwork {

    private _endpointDescription: SageMaker.DescribeEndpointOutput;

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

    @inject("Context")
    private _context: Container;

    @inject(SageMakerEndpointConfigService)
    private _endPointConfigService: SageMakerEndpointConfigService;

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
                .catch(()=>{
                    return this._createEndpoint()
                        .then(sagemaker.describeEndpoint(input).promise)
                })
                .then((output: SageMaker.DescribeEndpointOutput) => {
                    this._endpointDescription = output;
                    return output;
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
            EndpointConfigName: config.EndpointConfigName,
            Tags: [SageMakerEnvironmentHelper.getAWSEnvironmentTag()]
        };

        return sagemaker.createEndpoint(input).promise();
    }

}