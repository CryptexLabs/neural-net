import 'mocha';
import * as chai from "chai";
import {SageMakerNetworkProvider} from "../../../../src/models/provider/sagemaker/SageMakerNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../../src/interfaces/provider/UnsupervisedProvidedNetwork";
import {NeuralNetService} from "../../../../src/models/NeuralNetService";

describe('SageMakerNetworkProvider', () => {

    let service = NeuralNetService.getWithDefaultConfig();

    let provider = service.getSageMakerNetworkProvider();

    it('should get an instance of an unsupervised test network', (done) => {

        provider
            .getKMeansNetwork('TestNetwork')
            .then((network: UnsupervisedProvidedNetwork) => {
                chai.expect(network).not.to.be.undefined;
                chai.expect(network).not.to.be.null;
            })
            .then(done)
            .catch(done);

    }).timeout(10000);


});