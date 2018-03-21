import {NeuralNetInputData} from "../../interfaces/input/NeuralNetInputData";
import {NeuralNetInput} from "../../interfaces/input/NeuralNetInput";

export class S3CSVInputData<T extends NeuralNetInput> implements NeuralNetInputData<T> {

    private _rows: T[];

    constructor(bucketName: string, filePath: string) {
        this._bucketName = bucketName;
        this._filePath = filePath;
        this._rows = [];
    }

    private _bucketName: string;

    get bucketName(): string {
        return this._bucketName;
    }

    private _filePath: string;

    get filePath(): string {
        return this._filePath;
    }

    public addRow(row: T) {
        this._rows.push(row);
    }

    public saveToFile(): Promise<void> {
        // TODO Implement S3CSVInputData::saveToFile
        // Save rows to s3
        for (let rowIndex = 0; rowIndex < this._rows.length; rowIndex) {
            let csvRow = this._rows[rowIndex].getInput().join(',');
            // push csvRow to output buffer
        }
        return undefined;
    }
}