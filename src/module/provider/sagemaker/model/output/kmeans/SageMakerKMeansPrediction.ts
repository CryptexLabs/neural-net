import {KMeansPrediction} from "../../../../../../interface/algorithm/kmeans/KMeansPrediction";

export class SageMakerKMeansPrediction implements KMeansPrediction {

    private _closestCluster: any;
    private _distanceToCluster: number;

    constructor(closestCluster: any, distanceToCluster: number){
        this._closestCluster = closestCluster;
        this._distanceToCluster = distanceToCluster;
    }

    public getClosestCluster(): any {
        return this._closestCluster;
    }

    public getDistanceToCluster(): number {
        return this._distanceToCluster;
    }

}