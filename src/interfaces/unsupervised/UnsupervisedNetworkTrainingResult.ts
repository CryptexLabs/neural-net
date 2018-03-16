import {NeuralNetOutputData} from "../output/NeuralNetOutputData";

export interface UnsupervisedNetworkTrainingResult {

    getOutput(): NeuralNetOutputData;

    getResultID(): string;
    
}