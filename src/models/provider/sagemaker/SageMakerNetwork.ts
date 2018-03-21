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
import {Container, inject, injectable} from "inversify";
import "reflect-metadata";
import {SageMakerModelService} from "./service/SageMakerModelService";
import {SageMakerJobService} from "./service/SageMakerJobService";
import {SageMakerEndpointService} from "./service/SageMakerEndpointService";
import {MultiVariantNetwork} from "../../../interfaces/provider/network/MultiVariantNetwork";
import {NeuralNetConfig, SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";

interface D extends NetworkDescription, SageMakerNetworkDescriptor {}

@injectable()
export class SageMakerNetwork implements UnsupervisedProvidedNetwork, SupervisedProvidedNetwork, MultiVariantNetwork {

    private _endPointService: SageMakerEndpointService;
    private _modelService: SageMakerModelService;
    private _jobService: SageMakerJobService;

    private _container: Container;

    @inject("Config")
    private _config: SageMakerNeuralNetConfig;

    public init(description: D) {
        this._endPointService = new SageMakerEndpointService(this._config, description);
        this._modelService = new SageMakerModelService(this._config, description);
        this._jobService = new SageMakerJobService(this._config, description.getUniqueName());

        this._container = new Container();
        this._container.bind<D>("Description").toConstantValue(description).whenTargetIsDefault();
        this._container.bind<SageMakerJobService>(SageMakerJobService).toSelf();
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

}