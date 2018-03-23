import {SageMakerNetworkDescriptor} from "../description/SageMakerNetworkDescriptor";
import {NetworkDescriptor} from "../../../../../interface/description/NetworkDescriptor";
import {SageMakerInputSerializer} from "../input/SageMakerInputSerializer";
import {SageMakerOutputDeserializer} from "../output/SageMakerOutputDeserializer";
import {NeuralNetOutput} from "../../../../../interface/output/NeuralNetOutput";

export interface SageMakerNetworkAssistant<O extends NeuralNetOutput> extends
    NetworkDescriptor,
    SageMakerNetworkDescriptor,
    SageMakerInputSerializer,
    SageMakerOutputDeserializer<O>
{}