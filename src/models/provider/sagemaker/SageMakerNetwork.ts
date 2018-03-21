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
import {Container, injectable} from "inversify";
import "reflect-metadata";
import {SageMakerModelService} from "./service/SageMakerModelService";
import {SageMakerJobService} from "./service/SageMakerJobService";
import {SageMakerEndpointService} from "./service/SageMakerEndpointService";
import {MultiVariantNetwork} from "../../../interfaces/provider/network/MultiVariantNetwork";
import {SageMakerNeuralNetConfig} from "../../../interfaces/NeuralNetConfig";
import {SageMakerEndpointConfigService} from "./service/SageMakerEndpointConfigService";

interface D extends NetworkDescription, SageMakerNetworkDescriptor {}

@injectable()
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