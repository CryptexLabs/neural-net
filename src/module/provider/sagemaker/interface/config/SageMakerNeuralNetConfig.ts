import {SageMakerProductionVariantInstanceType} from "../network/variant/SageMakerProductionVariantInstanceType";

export interface SageMakerNeuralNetConfig {
    roleARN: string;
    instanceType: SageMakerProductionVariantInstanceType;
    region: string;
}