import {KMeansNeuralNetOutput} from "../../../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {SageMakerOutputDeserializer} from "../../../output/SageMakerOutputDeserializer";

export interface SageMakerKMeansOutputDeserializer extends SageMakerOutputDeserializer<KMeansNeuralNetOutput> {
    deserialize(data: any): KMeansNeuralNetOutput;
}