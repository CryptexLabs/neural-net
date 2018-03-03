import {Market} from "cryptex-shared-models/src/models/market/Market";

export abstract class BaseNetwork {
	private _market: Market;

	constructor(market: Market){
		this._market = market;
	}
}