export interface SageMakerNeuralNetConfig {
    roleARN: string;
}
export interface AmazonNeuralNetConfig {
    sagemaker: SageMakerNeuralNetConfig;
}
export interface NeuralNetConfig {
    amazon: AmazonNeuralNetConfig;
}