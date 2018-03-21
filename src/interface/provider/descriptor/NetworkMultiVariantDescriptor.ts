import {NetworkVariantDescriptor} from "./NetworkVariantDescriptor";

export interface NetworkMultiVariantDescriptor {
    getDescriptors(): NetworkVariantDescriptor[];
}