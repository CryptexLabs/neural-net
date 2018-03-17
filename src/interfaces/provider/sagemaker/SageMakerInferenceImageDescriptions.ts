export interface SageMakerKMeansInferenceImageDescriptions {
    "us-west-2": string,
    "us-east-1": string,
    "us-east-2": string,
    "eu-west-1": string
}
export interface SageMakerInferenceImageDescriptions {
    kmeans: SageMakerKMeansInferenceImageDescriptions;
}

export enum SageMakerInferenceImageAlgorithm {
    kmeans = "kmeans"
}