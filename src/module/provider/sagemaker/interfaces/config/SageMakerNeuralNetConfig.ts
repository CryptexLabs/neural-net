import {SageMakerProductionVariantInstanceType} from "../network/SageMakerProductionVariantInstanceType";

export interface SageMakerNeuralNetConfig {
    roleARN: string;
    instanceType: SageMakerProductionVariantInstanceType;
}