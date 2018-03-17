import {NeuralNetInputData} from "../../interfaces/input/NeuralNetInputData";

export class S3CSVInputData implements NeuralNetInputData {

    private _bucketName: string;
    private _filePath: string;

    constructor(bucketName: string, filePath: string) {
        this._bucketName = bucketName;
        this._filePath = filePath;
    }

    get bucketName(): string {
        return this._bucketName;
    }

    get filePath(): string {
        return this._filePath;
    }
}