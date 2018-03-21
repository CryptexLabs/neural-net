import {SageMakerNeuralNetConfig} from "../module/provider/sagemaker/interfaces/config/SageMakerNeuralNetConfig";

export interface AmazonNeuralNetConfig {
    sagemaker: SageMakerNeuralNetConfig;
}

export interface NeuralNetConfig {
    amazon: AmazonNeuralNetConfig;
}