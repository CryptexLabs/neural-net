"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NetworkProviderService_1 = require("../src/models/NetworkProviderService");
const RSIConfigNetwork_1 = require("../src/models/network/config/rsi/RSIConfigNetwork");
const Market_1 = require("cryptex-shared-models/src/models/market/Market");
const RSIConfigNetworkInput_1 = require("../src/models/network/config/rsi/RSIConfigNetworkInput");
let provider = NetworkProviderService_1.NetworkProviderService.getDefaultProvider();
let market = new Market_1.Market('GDAX', 'BTC', 'USD');
let network = new RSIConfigNetwork_1.RSIConfigNetwork(provider, market);
let input = new RSIConfigNetworkInput_1.RSIConfigNetworkInput(40, 45, 60, 70, 40, 29);
network
    .loadResult(input)
    .then((output) => {
    // This is the guess of the neural network.
    // Use it in your application.
    console.log(output.getValues());
})
    .catch((error) => {
    // Do something with the error.
});
//# sourceMappingURL=load-result-example.js.map