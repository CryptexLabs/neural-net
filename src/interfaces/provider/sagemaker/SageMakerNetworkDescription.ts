import {NetworkDescription} from "../../description/NetworkDescription";

export interface SageMakerNetworkDescription extends NetworkDescription {
    getContainerImage(): string;
    getModelDataUrl(): string;
}