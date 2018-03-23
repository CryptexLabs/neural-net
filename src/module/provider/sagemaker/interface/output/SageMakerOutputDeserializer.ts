import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";

export interface SageMakerOutputDeserializer<O extends NeuralNetOutput> {
    deserialize(data: any): O;
}