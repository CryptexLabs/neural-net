export interface SageMakerNetworkDescriptor {

    getContainerImage(): string;

    getModelDataUrl(): string;
}