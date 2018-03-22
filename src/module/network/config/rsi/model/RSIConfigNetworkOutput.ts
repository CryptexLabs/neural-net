import {KMeansNeuralNetOutput} from "../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {KMeansPrediction} from "../../../../../interface/algorithm/kmeans/KMeansPrediction";

export class RSIConfigNetworkOutput implements KMeansNeuralNetOutput {

    private _output: KMeansNeuralNetOutput;

    constructor(output: KMeansNeuralNetOutput) {
        this._output = output;
    }

    public getPredictions(): KMeansPrediction[] {
        return this._output.getPredictions();
    }
}