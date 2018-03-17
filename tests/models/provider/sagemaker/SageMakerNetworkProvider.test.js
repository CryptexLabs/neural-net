"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai = require("chai");
const SageMakerNetworkProvider_1 = require("../../../../src/models/provider/sagemaker/SageMakerNetworkProvider");
describe('SageMakerNetworkProvider', () => {
    let networkProvider = new SageMakerNetworkProvider_1.SageMakerNetworkProvider();
    it('should get an instance of an unsupervised test network', (done) => {
        networkProvider
            .getKMeansNetwork('TestNetwork')
            .then((network) => {
            chai.expect(network).not.to.be.undefined;
            chai.expect(network).not.to.be.null;
        })
            .then(done)
            .catch(done);
    }).timeout(10000);
});
//# sourceMappingURL=SageMakerNetworkProvider.test.js.map