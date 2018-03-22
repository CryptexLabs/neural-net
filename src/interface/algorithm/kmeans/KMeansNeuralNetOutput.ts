import {NeuralNetOutput} from "../../output/NeuralNetOutput";
import {KMeansPrediction} from "./KMeansPrediction";

export interface KMeansNeuralNetOutput extends NeuralNetOutput {

    getPredictions(): KMeansPrediction[];

}