"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseNetwork_1 = require("../base/BaseNetwork");
class SomeBoringNetwork extends BaseNetwork_1.BaseNetwork {
    train(inputs, callback) {
        throw new Error('SomeBoringNetwork.trainUnsupervisedNetwork not implemented');
    }
}
exports.SomeBoringNetwork = SomeBoringNetwork;
//# sourceMappingURL=SomeBoringNetwork.js.map