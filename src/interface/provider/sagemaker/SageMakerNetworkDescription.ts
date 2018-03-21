import {NeuralNetOutput} from "../../output/NeuralNetOutput";

export interface SageMakerNetworkDescriptor {
    getContainerImage(): string;

    getModelDataUrl(): string;

    getNewOutput(data: any): NeuralNetOutput
}