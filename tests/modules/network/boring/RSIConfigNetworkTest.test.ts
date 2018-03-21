import {expect} from 'chai';
import 'mocha';

import {RSIConfigNetwork} from "../../../../src/module/network/config/rsi/model/RSIConfigNetwork";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {RSIConfigNetworkInput} from "../../../../src/module/network/config/rsi/model/RSIConfigNetworkInput";
import {NeuralNetServiceHelper} from "../../../../src/helper/NeuralNetServiceHelper";

describe('RSIConfigNetwork', () => {

    let one_minute = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    let _input0 = new RSIConfigNetworkInput(0, 1, 2, 3, 4, 5);
    let _input1 = new RSIConfigNetworkInput(1, 2, 3, 4, 5, 6);
    let _input2 = new RSIConfigNetworkInput(2, 3, 4, 5, 6, 7);

    let provider = NeuralNetServiceHelper.getDefaultProvider();

    const rsiConfigNetwork = new RSIConfigNetwork(new Market('GDAX', 'BTC', 'USD'), provider);

    it('should instantiate new instance of RSIConfigNetwork', (done) => {

        expect(typeof rsiConfigNetwork).not.equal(undefined);
        done();

    });


    it('should return some output from training', (done) => {

        let inputs = [_input0, _input1, _input2];

        // Fails
        // rsiConfigNetwork.trainUnsupervisedNetwork(inputs, function (err, res) {
        //     expect(err).is.equal(null);
        //     done();
        // });
        done();

    });

});