import {NetworkMultiVariantDescriptor} from "../../../../interfaces/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkVariantDescriptor} from "../../../../interfaces/provider/descriptor/NetworkVariantDescriptor";
import {injectable} from "inversify";

@injectable()
export class DefaultSageMakerNetworkMultiVariantDescription implements NetworkMultiVariantDescriptor {

    public getDescriptors(): NetworkVariantDescriptor[] {
        // TODO Implement DefaultSageMakerNetworkMultiVariantDescription::getDescriptors
        return [];
    }
}