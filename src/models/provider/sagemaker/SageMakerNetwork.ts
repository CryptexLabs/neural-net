import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";
import {NeuralNetOutputData} from "../../../interfaces/output/NeuralNetOutputData";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";

declare let AWS;

export class SageMakerNetwork implements UnsupervisedProvidedNetwork {

	public static createFromCreateModelOutput(createOutput: AWS.SageMaker.Types.CreateModelOutput):SageMakerNetwork{
		// TODO
		return undefined;
	}

	public static createFromDescribeModelOutput(describeOutput: AWS.SageMaker.Types.DescribeModelOutput):SageMakerNetwork{
		// TODO
		return undefined;
	}

	train(input: NeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
		return undefined;
	}

}