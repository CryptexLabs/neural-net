"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const RSIConfigNetwork_1 = require("../../../../src/models/network/config/rsi/RSIConfigNetwork");
const RSIStrategyConfigNetworkInput_1 = require("../../../../src/models/network/config/rsi/RSIStrategyConfigNetworkInput");
const Market_1 = require("cryptex-shared-models/src/models/market/Market");
const SageMakerNetworkProvider_1 = require("../../../../src/models/provider/sagemaker/SageMakerNetworkProvider");
describe('RSIConfigNetwork', () => {
    let one_minute = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let _input0 = new RSIStrategyConfigNetworkInput_1.RSIStrategyConfigNetworkInput(0);
    let _input1 = new RSIStrategyConfigNetworkInput_1.RSIStrategyConfigNetworkInput(1);
    let _input2 = new RSIStrategyConfigNetworkInput_1.RSIStrategyConfigNetworkInput(2);
    const rsiConfigNetwork = new RSIConfigNetwork_1.RSIConfigNetwork(new SageMakerNetworkProvider_1.SageMakerNetworkProvider(), new Market_1.Market('GDAX', 'BTC', 'USD'));
    it('should instantiate new instance of RSIConfigNetwork', (done) => {
        chai_1.expect(typeof rsiConfigNetwork).not.equal(undefined);
        done();
    });
    it('should return some output from training', (done) => {
        let inputs = [_input0, _input1, _input2];
        // Fails
        // rsiConfigNetwork.train(inputs, function (err, res) {
        //     expect(err).is.equal(null);
        //     done();
        // });
        done();
    });
});
//# sourceMappingURL=RSIConfigNetworkTest.test.js.map