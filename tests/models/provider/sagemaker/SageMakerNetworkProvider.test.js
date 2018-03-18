"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai = require("chai");
const NeuralNetService_1 = require("../../../../src/models/NeuralNetService");
describe('SageMakerNetworkProvider', () => {
    let service = NeuralNetService_1.NeuralNetService.getWithDefaultConfig();
    let provider = service.getSageMakerNetworkProvider();
    it('should get an instance of an unsupervised test network', (done) => {
        provider
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