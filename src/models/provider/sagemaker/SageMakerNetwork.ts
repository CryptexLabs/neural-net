import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {SageMaker} from "aws-sdk";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/SupervisedProvidedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";
import {SupervisedNeuralNetInputData} from "../../../interfaces/supervised/SupervisedNeuralNetInputData";

declare let AWS;

export class SageMakerNetwork implements UnsupervisedProvidedNetwork, SupervisedProvidedNetwork {

    trainUnsupervisedNetwork(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

    trainSupervisedNetwork(input: SupervisedNeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        throw new Error("Method not implemented.");
    }

    public static createFromCreateModelOutput(createOutput: SageMaker.Types.CreateModelOutput): SageMakerNetwork {
        // TODO Implement SageMakerNetwork::createFromCreateModelOutput
        return new SageMakerNetwork();
    }

    public static createFromDescribeModelOutput(describeOutput: SageMaker.Types.DescribeModelOutput): SageMakerNetwork {
        // TODO SageMakerNetwork::createFromDescribeModelOutput
        return new SageMakerNetwork();
    }

}