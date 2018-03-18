import {NeuralNetInput} from "../input/NeuralNetInput";
import {UnsupervisedNetworkTrainingResult} from "./UnsupervisedNetworkTrainingResult";
import {NeuralNetOutput} from "../output/NeuralNetOutput";
import {NeuralNetInputData} from "../input/NeuralNetInputData";

export interface UnsupervisedNetwork {

	train<T extends NeuralNetInput>(input: NeuralNetInputData<T>): Promise<UnsupervisedNetworkTrainingResult>;

	scoreTrainingResult(resultID: string, score: number): Promise<void>;

}