import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {SageMaker} from "aws-sdk";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/SupervisedProvidedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";
import {SupervisedNeuralNetInputData} from "../../../interfaces/supervised/SupervisedNeuralNetInputData";
import {NeuralNetInput} from "../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";

declare let AWS;

export class SageMakerNetwork implements UnsupervisedProvidedNetwork, SupervisedProvidedNetwork {

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        // TODO Implement SageMakerNetwork::scoreTrainingResult
        throw new Error("Method not implemented.");
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        // TODO Implement SageMakerNetwork::guess
        throw new Error("Method not implemented.");
    }

    public trainUnsupervisedNetwork<T extends NeuralNetInput>(input: NeuralNetInputData<T>): Promise<UnsupervisedNetworkTrainingResult> {
        // TODO Implement SageMakerNetwork::trainUnsupervisedNetwork
        throw new Error("Method not implemented.");
    }

    public trainSupervisedNetwork(input: SupervisedNeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        // TODO Implement SageMakerNetwork::trainSupervisedNetwork
        throw new Error("Method not implemented.");
    }

    public static createFromCreateModelOutput(createOutput: SageMaker.Types.CreateModelOutput): SageMakerNetwork {
        // TODO Implement SageMakerNetwork::createFromCreateModelOutput
        return new SageMakerNetwork();
    }

    public static createFromDescribeModelOutput(describeOutput: SageMaker.Types.DescribeModelOutput): SageMakerNetwork {
        // TODO Implement SageMakerNetwork::createFromDescribeModelOutput
        return new SageMakerNetwork();
    }

}