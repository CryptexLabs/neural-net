"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class S3CSVInputData {
    constructor(bucketName, filePath) {
        this._bucketName = bucketName;
        this._filePath = filePath;
    }
    get bucketName() {
        return this._bucketName;
    }
    get filePath() {
        return this._filePath;
    }
}
exports.S3CSVInputData = S3CSVInputData;
//# sourceMappingURL=S3CSVInputData.js.map