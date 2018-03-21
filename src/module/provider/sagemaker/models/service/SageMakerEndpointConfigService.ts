import "reflect-metadata";
import {MultiVariantNetwork} from "../../../../../interface/provider/network/MultiVariantNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {SageMakerEnvironmentHelper} from "../../helper/SageMakerEnvironmentHelper";
import {inject, injectable} from "inversify";
import {NetworkDescription} from "../../../../../interface/description/NetworkDescription";
import {SageMakerNetworkDescriptor} from "../../interfaces/description/SageMakerNetworkDescription";
import SageMaker = require("aws-sdk/clients/sagemaker");
import {SageMakerNeuralNetConfig} from "../../interfaces/config/SageMakerNeuralNetConfig";

@injectable()
export class SageMakerEndpointConfigService implements MultiVariantNetwork {

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    @inject("Description")
    private _description: SageMakerNetworkDescriptor & NetworkDescription;

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
                EndpointConfigName: this._description.getUniqueName()
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
            EndpointConfigName: this._description.getUniqueName(),
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

                ModelName: this._description.getUniqueName(),

                InitialInstanceCount: descriptor.getInstanceCount(),

                InstanceType: this._config.instanceType,

                InitialVariantWeight: descriptor.getWeight()
            };

            variants.push(variant);
        }

        return variants;
    }

}