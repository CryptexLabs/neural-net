import {SageMakerOutputDeserializer} from "../output/SageMakerOutputDeserializer";
import {SageMakerInputSerializer} from "../input/SageMakerInputSerializer";

export interface SageMakerIOTransformer extends SageMakerOutputDeserializer, SageMakerInputSerializer {

}