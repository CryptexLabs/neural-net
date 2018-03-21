import {NetworkMultiVariantDescriptor} from "../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkVariantDescriptor} from "../../../../interface/provider/descriptor/NetworkVariantDescriptor";
import {injectable} from "inversify";

@injectable()
export class DefaultSageMakerNetworkMultiVariantDescription implements NetworkMultiVariantDescriptor {

    public getDescriptors(): NetworkVariantDescriptor[] {
        // TODO Implement DefaultSageMakerNetworkMultiVariantDescription::getDescriptors
        return [];
    }
}