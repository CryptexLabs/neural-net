import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/network/UnsupervisedProvidedNetwork";
import {SageMaker} from "aws-sdk";
import {SupervisedProvidedNetwork} from "../../../interfaces/provider/network/SupervisedProvidedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interfaces/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../interfaces/input/NeuralNetInputData";
import {SupervisedNeuralNetInputData} from "../../../interfaces/supervised/SupervisedNeuralNetInputData";
import {NeuralNetInput} from "../../../interfaces/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../interfaces/output/NeuralNetOutput";
import {NetworkMultiVariantDescriptor} from "../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {SageMakerNetworkDescriptor} from "../../../interfaces/provider/sagemaker/SageMakerNetworkDescription";
import {NetworkDescription} from "../../../interfaces/description/NetworkDescription";
import {injectable} from "inversify";
import "reflect-metadata";
import {SageMakerModelService} from "./service/SageMakerModelService";
import {SageMakerJobService} from "./service/SageMakerJobService";
import {SageMakerEndpointService} from "./service/SageMakerEndpointService";
import {MultiVariantNetwork} from "../../../interfaces/provider/network/MultiVariantNetwork";

declare let AWS;

@injectable()
export class SageMakerNetwork implements UnsupervisedProvidedNetwork, SupervisedProvidedNetwork, MultiVariantNetwork {

    private _description: NetworkDescription & SageMakerNetworkDescriptor;

    private _endPointService: SageMakerEndpointService;

    private _modelService: SageMakerModelService;

    private _jobService: SageMakerJobService;

    public constructor(description: NetworkDescription & SageMakerNetworkDescriptor, instanceType: string) {
        this._description = description;
        this._endPointService = new SageMakerEndpointService(description, instanceType);
        this._modelService = new SageMakerModelService();
        this._jobService = new SageMakerJobService();
    }

    public setMultiVariantDescriptor(descriptor: NetworkMultiVariantDescriptor) {
        this._endPointService.setMultiVariantDescriptor(descriptor);
    }

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        // TODO Implement SageMakerNetwork::scoreTrainingResult
        throw new Error("Method not implemented.");
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._endPointService.getEndpoint()
            .then((endpoint: SageMaker.DescribeEndpointOutput) => {
                return this._endPointService.getOutputForEndpoint(endpoint);
            });
    }

    /**
     * @see https://docs.aws.amazon.com/sagemaker/latest/dg/ex1-train-model-create-training-job.html
     *
     * @param {NeuralNetInputData<T extends NeuralNetInput>} input
     * @returns {Promise<UnsupervisedNetworkTrainingResult>}
     */
    public trainUnsupervisedNetwork<T extends NeuralNetInput>(input: NeuralNetInputData<T>): Promise<UnsupervisedNetworkTrainingResult> {
        // TODO Implement SageMakerNetwork::trainUnsupervisedNetwork
        throw new Error("Method not implemented.");
    }

    public trainSupervisedNetwork(input: SupervisedNeuralNetInputData): Promise<UnsupervisedNetworkTrainingResult> {
        // TODO Implement SageMakerNetwork::trainSupervisedNetwork
        throw new Error("Method not implemented.");
    }

    // private _getNetworkFromNewModel(description: SageMakerNetworkDescriptor): Promise<SageMakerNetwork> {
    //
    //     let createModelInput: SageMaker.CreateModelInput = {
    //         ExecutionRoleArn: this._config.roleARN,
    //         ModelName: description.getUniqueName(),
    //         PrimaryContainer: {
    //             Image: description.getContainerImage(),
    //             ModelDataUrl: description.getModelDataUrl()
    //         },
    //         Tags: [
    //             {
    //                 Key: 'environment',
    //                 Value: ENV
    //             },
    //         ]
    //     };
    //
    //     return this._sageMaker
    //         .createModel(createModelInput).promise()
    //         .then(SageMakerNetwork.createFromCreateModelOutput);
    // }
    //
    // private _getNetworkFromExistingModel(description: SageMakerNetworkDescriptor): Promise<SageMakerNetwork> {
    //
    //     let describeModelInput: SageMaker.DescribeModelInput = {
    //         ModelName: description.getUniqueName()
    //     };
    //
    //     return this._sageMaker
    //         .describeModel(describeModelInput).promise()
    //         .then(SageMakerNetwork.createFromDescribeModelOutput)
    // }

    // public static createFromCreateModelOutput(createOutput: SageMaker.Types.CreateModelOutput): SageMakerNetwork {
    //     // TODO Implement SageMakerNetwork::createFromCreateModelOutput
    //     return new SageMakerNetwork();
    // }
    //
    // public static createFromDescribeModelOutput(describeOutput: SageMaker.Types.DescribeModelOutput): SageMakerNetwork {
    //     // TODO Implement SageMakerNetwork::createFromDescribeModelOutput
    //     return new SageMakerNetwork();
    // }

}