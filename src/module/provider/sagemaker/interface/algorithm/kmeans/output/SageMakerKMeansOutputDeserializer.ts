import {KMeansNeuralNetOutput} from "../../../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {SageMakerOutputDeserializer} from "../../../output/SageMakerOutputDeserializer";

export interface SageMakerKMeansOutputDeserializer extends SageMakerOutputDeserializer {

    deserialize(data: any): KMeansNeuralNetOutput;

}