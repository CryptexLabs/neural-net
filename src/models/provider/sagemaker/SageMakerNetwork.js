"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SageMakerNetwork {
    trainUnsupervisedNetwork(input) {
        throw new Error("Method not implemented.");
    }
    trainSupervisedNetwork(input) {
        throw new Error("Method not implemented.");
    }
    static createFromCreateModelOutput(createOutput) {
        // TODO Implement SageMakerNetwork::createFromCreateModelOutput
        return new SageMakerNetwork();
    }
    static createFromDescribeModelOutput(describeOutput) {
        // TODO SageMakerNetwork::createFromDescribeModelOutput
        return new SageMakerNetwork();
    }
}
exports.SageMakerNetwork = SageMakerNetwork;
//# sourceMappingURL=SageMakerNetwork.js.map