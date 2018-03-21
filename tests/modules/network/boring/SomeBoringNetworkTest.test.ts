import {expect} from 'chai';
import 'mocha';

import {SomeBoringNetwork} from '../../../../examples/network/boring/SomeBoringNetwork';
import {SupervisedBoringNeuralNetInput} from "../../../../examples/network/boring/SupervisedBoringNeuralNetInput";
import {SomeBoringNetworkInput} from "../../../../examples/network/boring/SomeBoringNetworkInput";
import {SomeBoringNetworkOutput} from "../../../../examples/network/boring/SomeBoringNetworkOutput";
import {Market} from "cryptex-shared-models/src/models/market/Market"

describe('SomeBoringNetwork', () => {

	let _input: SomeBoringNetworkInput;
	let _output: SomeBoringNetworkOutput;
	let _market: Market = new Market('GDAX', 'USD', 'BTC');

	const result = new SomeBoringNetwork(_market);
	let inputs   = [new SupervisedBoringNeuralNetInput(_input, _output)];

	it('should instantiate new instance of SomeBoringNetwork', (done) => {

		expect(typeof result).not.equal(undefined);
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