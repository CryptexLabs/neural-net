import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";

export interface SageMakerOutputDeserializer {
    deserialize(data: any): NeuralNetOutput;
}