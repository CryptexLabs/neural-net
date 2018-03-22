import {SageMakerNeuralNetConfig} from "../module/provider/sagemaker/interface/config/SageMakerNeuralNetConfig";

export interface AmazonNeuralNetConfig {
    sagemaker: SageMakerNeuralNetConfig;
}

export interface NeuralNetConfig {
    amazon: AmazonNeuralNetConfig;
}