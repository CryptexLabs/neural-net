"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const SomeBoringNetwork_1 = require("../../../../src/models/network/boring/SomeBoringNetwork");
const SupervisedBoringNeuralNetInput_1 = require("../../../../src/models/network/boring/SupervisedBoringNeuralNetInput");
describe('SomeBoringNetwork', () => {
    let _input;
    let _output;
    const result = new SomeBoringNetwork_1.SomeBoringNetwork();
    let inputs = [new SupervisedBoringNeuralNetInput_1.SupervisedBoringNeuralNetInput(_input, _output)];
    it('should instantiate new instance of SomeBoringNetwork', (done) => {
        chai_1.expect(typeof result).not.equal(undefined);
        done();
    });
    it('should fail when inputs are undefined', (done) => {
        let inputs = new SupervisedBoringNeuralNetInput_1.SupervisedBoringNeuralNetInput(_input, _output);
        result.train([inputs], function (err, res) {
            chai_1.expect(err).is.equal(undefined);
            done();
        });
    });
});
//# sourceMappingURL=SomeBoringNetworkTest.test.js.map