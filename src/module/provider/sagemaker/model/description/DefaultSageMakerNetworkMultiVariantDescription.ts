import {NetworkMultiVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkMultiVariantDescriptor";
import {NetworkVariantDescriptor} from "../../../../../interface/provider/descriptor/NetworkVariantDescriptor";
import {injectable} from "inversify";

@injectable()
export class DefaultSageMakerNetworkMultiVariantDescription implements NetworkMultiVariantDescriptor {

    public getDescriptors(): NetworkVariantDescriptor[] {
        let descriptor: NetworkVariantDescriptor = {
            getVariantName(): string {
                return 'Default'
            },

            getInstanceCount(): number {
                return 1
            },

            getWeight(): number {
                return 1
            },
        };
        return [descriptor];
    }
}