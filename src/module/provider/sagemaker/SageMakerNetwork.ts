import {UnsupervisedProvidedNetwork} from "../../../interface/provider/network/UnsupervisedProvidedNetwork";
import {SageMaker} from "aws-sdk";
import {SupervisedProvidedNetwork} from "../../../interface/provider/network/SupervisedProvidedNetwork";
import {UnsupervisedNetworkTrainingResult} from "../../../interface/unsupervised/UnsupervisedNetworkTrainingResult";
import {NeuralNetInputData} from "../../../interface/input/NeuralNetInputData";
import {SupervisedNeuralNetInputData} from "../../../interface/supervised/SupervisedNeuralNetInputData";
import {NeuralNetInput} from "../../../interface/input/NeuralNetInput";
import {NeuralNetOutput} from "../../../interface/output/NeuralNetOutput";
import {NetworkMultiVariantDescriptor} from "../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {SageMakerNetworkDescriptor} from "../../../interface/provider/sagemaker/SageMakerNetworkDescription";
import {NetworkDescription} from "../../../interface/description/NetworkDescription";
import {Container} from "inversify";
import "reflect-metadata";
import {SageMakerModelService} from "./service/SageMakerModelService";
import {SageMakerJobService} from "./service/SageMakerJobService";
import {SageMakerEndpointService} from "./service/SageMakerEndpointService";
import {MultiVariantNetwork} from "../../../interface/provider/network/MultiVariantNetwork";
import {SageMakerNeuralNetConfig} from "../../../interface/NeuralNetConfig";
import {SageMakerEndpointConfigService} from "./service/SageMakerEndpointConfigService";

interface D extends NetworkDescription, SageMakerNetworkDescriptor {}

export class SageMakerNetwork implements UnsupervisedProvidedNetwork, SupervisedProvidedNetwork, MultiVariantNetwork {

    private _context: Container;

    constructor(config: SageMakerNeuralNetConfig, description: D){
        this._context = new Container();

        this._context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(config).whenTargetIsDefault();
        this._context.bind<Container>("Context").toConstantValue(this._context).whenTargetIsDefault();
        this._context.bind<D>("Description").toConstantValue(description).whenTargetIsDefault();

        this._context.bind<SageMakerJobService>(SageMakerJobService).toSelf().inSingletonScope();
        this._context.bind<SageMakerModelService>(SageMakerModelService).toSelf().inSingletonScope();
        this._context.bind<SageMakerEndpointService>(SageMakerEndpointService).toSelf().inSingletonScope();
        this._context.bind<SageMakerEndpointConfigService>(SageMakerEndpointConfigService).toSelf().inSingletonScope();
    }

    public setMultiVariantDescriptor(descriptor: NetworkMultiVariantDescriptor) {
        this._context.get(SageMakerEndpointService).setMultiVariantDescriptor(descriptor);
    }

    public scoreTrainingResult(resultID: string, score: number): Promise<void> {
        // TODO Implement SageMakerNetwork::scoreTrainingResult
        throw new Error("Method not implemented.");
    }

    public guess(input: NeuralNetInput): Promise<NeuralNetOutput> {
        return this._context.get(SageMakerEndpointService).getEndpoint()
            .then((endpoint: SageMaker.DescribeEndpointOutput) => {
                return this._context.get(SageMakerEndpointService).getOutputForEndpoint(endpoint);
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