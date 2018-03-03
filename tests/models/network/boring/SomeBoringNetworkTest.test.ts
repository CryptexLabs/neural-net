import {expect} from 'chai';
import 'mocha';

import {SomeBoringNetwork} from '../../../../src/models/network/boring/SomeBoringNetwork';
import {SupervisedBoringNeuralNetInput} from "../../../../src/models/network/boring/SupervisedBoringNeuralNetInput";
import {SomeBoringNetworkInput} from "../../../../src/models/network/boring/SomeBoringNetworkInput";
import {SomeBoringNetworkOutput} from "../../../../src/models/network/boring/SomeBoringNetworkOutput";

describe('SomeBoringNetwork', () => {

	let _input: SomeBoringNetworkInput;
	let _output: SomeBoringNetworkOutput;

	const result = new SomeBoringNetwork();
	let inputs   = [new SupervisedBoringNeuralNetInput(_input, _output)];

	it('should instantiate new instance of SomeBoringNetwork', (done) => {

		expect(typeof result).not.equal(undefined);
		done();

	});


	it('should fail when inputs are undefined', (done) => {

		let inputs = new SupervisedBoringNeuralNetInput(_input, _output);
		result.train([inputs], function(err, res) {
			expect(err).is.equal(null);
			done();
		});

	});

});