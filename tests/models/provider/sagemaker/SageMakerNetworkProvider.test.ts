import 'mocha';
import * as chai from "chai";
import {SageMakerNetworkProvider} from "../../../../src/models/provider/sagemaker/SageMakerNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../../src/interfaces/provider/UnsupervisedProvidedNetwork";

describe('SageMakerNetworkProvider', () => {

    let networkProvider = new SageMakerNetworkProvider();

    it('should get an instance of an unsupervised test network', (done) => {

        networkProvider
            .getKMeansNetwork('TestNetwork')
            .then((network: UnsupervisedProvidedNetwork) => {
                chai.expect(network).not.to.be.undefined;
                chai.expect(network).not.to.be.null;
            })
            .then(done)
            .catch(done);

    }).timeout(10000);


});