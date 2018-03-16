import {NetworkProvider} from '../../../interfaces/provider/NetworkProvider';
import {SageMakerNetwork} from './SageMakerNetwork';

export class SageMakerNetworkProvider implements NetworkProvider {

    getNetwork(): SageMakerNetwork {
        return undefined;
    }
}