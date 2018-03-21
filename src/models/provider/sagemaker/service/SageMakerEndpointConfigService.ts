import "reflect-metadata";
import {MultiVariantNetwork} from "../../../../interfaces/provider/network/MultiVariantNetwork";
import {NetworkMultiVariantDescriptor} from "../../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {SageMakerEnvironmentHelper} from "../../../../helpers/provider/sagemaker/SageMakerEnvironmentHelper";
import {DefaultSageMakerNetworkMultiVariantDescription} from "../description/DefaultSageMakerNetworkMultiVariantDescription";
import {SageMakerNeuralNetConfig} from "../../../../interfaces/NeuralNetConfig";
import SageMaker = require("aws-sdk/clients/sagemaker");

export class SageMakerEndpointConfigService implements MultiVariantNetwork {

    private _multiVariantNetworkDescriptor: NetworkMultiVariantDescriptor;
    private _networkName: string;
    private _config: SageMakerNeuralNetConfig;

    constructor(config: SageMakerNeuralNetConfig, networkName: string) {
        this._config = config;
        this._networkName = networkName;
        this._multiVariantNetworkDescriptor = new DefaultSageMakerNetworkMultiVariantDescription();
    }

    public setMultiVariantDescriptor(descriptor: NetworkMultiVariantDescriptor) {
        this._multiVariantNetworkDescriptor = descriptor;
    }

    public getEndpointConfig(): Promise<SageMaker.DescribeEndpointConfigOutput> {
        // TODO Save endpoint config in cache
        let sagemaker = new SageMaker();

        let input: SageMaker.DescribeEndpointConfigInput = {
            EndpointConfigName: this._networkName
        };

        return sagemaker.describeEndpointConfig(input).promise()
            .catch(this._createEndpointConfig)
            .then(() => {
                return sagemaker.describeEndpointConfig(input).promise();
            });
    }

    private _createEndpointConfig(): Promise<SageMaker.CreateEndpointConfigOutput> {
        let sagemaker = new SageMaker();

        let input: SageMaker.CreateEndpointConfigInput = {
            EndpointConfigName: this._networkName,
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

                ModelName: this._networkName,

                InitialInstanceCount: descriptor.getInstanceCount(),

                InstanceType: this._config.instanceType,

                InitialVariantWeight: descriptor.getWeight()
            };

            variants.push(variant);
        }
        return variants;
    }

}