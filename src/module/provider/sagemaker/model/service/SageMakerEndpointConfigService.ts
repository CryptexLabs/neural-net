import "reflect-metadata";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {SageMakerEnvironmentHelper} from "../../helper/SageMakerEnvironmentHelper";
import {inject, injectable} from "inversify";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerNetworkDescriptor} from "../../interface/description/SageMakerNetworkDescriptor";
import {SageMakerNeuralNetConfig} from "../../interface/config/SageMakerNeuralNetConfig";
import SageMaker = require("aws-sdk/clients/sagemaker");

@injectable()
export class SageMakerEndpointConfigService implements MultiVariantNetwork {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Assistant")
    private _assistant: SageMakerNetworkDescriptor & NetworkDescriptor;

    private _multiVariantNetworkDescriptor: NetworkMultiVariantDescriptor;

    private _endpointConfig: SageMaker.DescribeEndpointConfigOutput;

    public setMultiVariantDescriptor(descriptor: NetworkMultiVariantDescriptor) {
        this._multiVariantNetworkDescriptor = descriptor;
    }

    public getEndpointConfig(): Promise<SageMaker.DescribeEndpointConfigOutput> {
        if(this._endpointConfig){
            return Promise.resolve(this._endpointConfig);
        }else{
            let sagemaker = new SageMaker();

            let input: SageMaker.DescribeEndpointConfigInput = {
                EndpointConfigName: this._assistant.getUniqueName()
            };

            return sagemaker
                .describeEndpointConfig(input).promise()
                .catch(()=>{
                    return this._createEndpointConfig().then(sagemaker.describeEndpointConfig(input).promise);
                });
        }
    }

    private _createEndpointConfig(): Promise<SageMaker.CreateEndpointConfigOutput> {
        let sagemaker = new SageMaker();

        let input: SageMaker.CreateEndpointConfigInput = {
            EndpointConfigName: this._assistant.getUniqueName(),
            ProductionVariants: this._getVariants(),
            Tags: [SageMakerEnvironmentHelper.getAWSEnvironmentTag()]
        };

        return sagemaker.createEndpointConfig(input).promise()
    }

    private _getVariants(): SageMaker.ProductionVariant[] {
        let variants: SageMaker.ProductionVariant[] = [];

        let descriptors = this._multiVariantNetworkDescriptor.getDescriptors();

        for (let i = 0; i < descriptors.length; i++) {
            let descriptor = descriptors[i];

            let variant: SageMaker.ProductionVariant = {

                VariantName: descriptor.getVariantName(),

                ModelName: this._assistant.getUniqueName(),

                InitialInstanceCount: descriptor.getInstanceCount(),

                InstanceType: this._config.instanceType,

                InitialVariantWeight: descriptor.getWeight()
            };

            variants.push(variant);
        }

        return variants;
    }

}