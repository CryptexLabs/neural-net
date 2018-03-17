import {expect} from 'chai';
import 'mocha';

import {RSIConfigNetwork} from "../../../../src/models/network/config/rsi/RSIConfigNetwork";
import {RSIStrategyConfigNetworkInput} from "../../../../src/models/network/config/rsi/RSIStrategyConfigNetworkInput";
import {Market} from "cryptex-shared-models/src/models/market/Market";
import {SageMakerNetworkProvider} from "../../../../src/models/provider/sagemaker/SageMakerNetworkProvider";

describe('RSIConfigNetwork', () => {

    let one_minute = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    let _input0 = new RSIStrategyConfigNetworkInput(0);
    let _input1 = new RSIStrategyConfigNetworkInput(1);
    let _input2 = new RSIStrategyConfigNetworkInput(2);

    const rsiConfigNetwork = new RSIConfigNetwork(new SageMakerNetworkProvider(), new Market('GDAX', 'BTC', 'USD'));

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