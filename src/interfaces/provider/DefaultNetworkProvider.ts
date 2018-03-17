import {KMeansNetworkProvider} from "./KMeansNetworkProvider";
import {UnsupervisedNetworkProvider} from "./UnsupervisedNetworkProvider";

export interface DefaultNetworkProvider extends KMeansNetworkProvider, UnsupervisedNetworkProvider {

}