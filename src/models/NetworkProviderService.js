"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SageMakerNetworkProvider_1 = require("./provider/sagemaker/SageMakerNetworkProvider");
class NetworkProviderService {
    constructor() { }
    static getDefaultProvider() {
        return new SageMakerNetworkProvider_1.SageMakerNetworkProvider();
    }
}
exports.NetworkProviderService = NetworkProviderService;
//# sourceMappingURL=NetworkProviderService.js.map