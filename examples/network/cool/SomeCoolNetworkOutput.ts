import {KMeansNeuralNetOutput} from "../../../src/interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {KMeansPrediction} from "../../../src/interface/algorithm/kmeans/KMeansPrediction";
import {NeuralNetOutput} from "../../../src/interface/output/NeuralNetOutput";

export class SomeCoolNetworkOutput implements NeuralNetOutput {
    
    private _predictions: KMeansPrediction[];

    constructor(output: KMeansNeuralNetOutput) {
       this._predictions = output.getPredictions();
    }

    public getCategory(): number {
        return this._getPredictionWithLeastDistance().getClosestCluster();
    }

    private _getPredictionWithLeastDistance(): KMeansPrediction {
        let smallest = this._predictions[0];
        for(let i = 1; i < this._predictions.length; i++){
            let prediction = this._predictions[i];
            if(prediction.getDistanceToCluster() < smallest.getDistanceToCluster()){
                smallest = prediction;
            }
        }
        return smallest;
    }

    public getCategoryDistance(): number {
        return this._getPredictionWithLeastDistance().getDistanceToCluster();
    }
}