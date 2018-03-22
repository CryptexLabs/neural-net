import {KMeansNeuralNetOutput} from "../../../../../../interface/algorithm/kmeans/KMeansNeuralNetOutput";
import {SageMakerKMeansResponse} from "../../../interface/algorithm/kmeans/response/SageMakerKMeansResponse";
import {SageMakerKMeansResponsePrediction} from "../../../interface/algorithm/kmeans/response/SageMakerKMeansResponsePrediction";
import {KMeansPrediction} from "../../../../../../interface/algorithm/kmeans/KMeansPrediction";
import {SageMakerKMeansPrediction} from "./SageMakerKMeansPrediction";

export class SageMakerKMeansNeuralNetOutput implements KMeansNeuralNetOutput {

    private _predictions: KMeansPrediction[];

    constructor(data: any) {
        this._deserializedResponseData(data);
    }

    private _deserializedResponseData(data: any) {
        let typedData = <SageMakerKMeansResponse> data;

        let deserializedPredictions = [];

        for (let i = 0; i < typedData.predictions.length; i++) {
            let prediction: SageMakerKMeansResponsePrediction = typedData.predictions[i];
            let deserializedPrediction = new SageMakerKMeansPrediction(
                prediction.closest_cluster,
                prediction.distance_to_cluster
            );
            deserializedPredictions.push(deserializedPrediction)
        }

        this._predictions = deserializedPredictions;
    }

    public getPredictions(): KMeansPrediction[] {
        return this._predictions;
    }

}