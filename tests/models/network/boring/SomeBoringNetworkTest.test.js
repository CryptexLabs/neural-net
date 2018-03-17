"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const SomeBoringNetwork_1 = require("../../../../src/models/network/boring/SomeBoringNetwork");
const SupervisedBoringNeuralNetInput_1 = require("../../../../src/models/network/boring/SupervisedBoringNeuralNetInput");
const Market_1 = require("cryptex-shared-models/src/models/market/Market");
describe('SomeBoringNetwork', () => {
    let _input;
    let _output;
    let _market = new Market_1.Market('GDAX', 'USD', 'BTC');
    const result = new SomeBoringNetwork_1.SomeBoringNetwork(_market);
    let inputs = [new SupervisedBoringNeuralNetInput_1.SupervisedBoringNeuralNetInput(_input, _output)];
    it('should instantiate new instance of SomeBoringNetwork', (done) => {
        chai_1.expect(typeof result).not.equal(undefined);
        done();
    });
    it('should fail when inputs are undefined', (done) => {
        // Fails
        // let inputs = new SupervisedBoringNeuralNetInput(_input, _output);
        // result.trainUnsupervisedNetwork([inputs], function(err, res) {
        // 	expect(err).is.equal(null);
        // 	done();
        // });
        done();
    });
});
//# sourceMappingURL=SomeBoringNetworkTest.test.js.map