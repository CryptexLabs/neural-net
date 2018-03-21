import {SageMakerProductionVariantInstanceType} from "./provider/sagemaker/SageMakerProductionVariantInstanceType";

export interface SageMakerNeuralNetConfig {
    roleARN: string;
    instanceType: SageMakerProductionVariantInstanceType;
}

export interface AmazonNeuralNetConfig {
    sagemaker: SageMakerNeuralNetConfig;
}

export interface NeuralNetConfig {
    amazon: AmazonNeuralNetConfig;
}