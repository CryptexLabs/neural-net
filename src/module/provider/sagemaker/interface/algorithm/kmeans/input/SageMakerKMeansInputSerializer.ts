import {SageMakerInputSerializer} from "../../../input/SageMakerInputSerializer";
import {SageMakerKMeansInput} from "./SageMakerKMeansInput";

export interface SageMakerKMeansInputSerializer extends SageMakerInputSerializer {
    serialize(input: SageMakerKMeansInput): any;
}