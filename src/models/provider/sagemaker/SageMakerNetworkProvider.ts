import {UnsupervisedNetworkProvider} from "../../../interfaces/provider/UnsupervisedNetworkProvider";
import {UnsupervisedProvidedNetwork} from "../../../interfaces/provider/UnsupervisedProvidedNetwork";
import {SageMakerNetwork} from "./SageMakerNetwork";
import {AWSError} from "aws-sdk";

declare let AWS;
let sagemaker = new AWS.SageMaker();

export class SageMakerNetworkProvider implements UnsupervisedNetworkProvider {

	public getUnsupervisedNetwork(name: string): Promise<UnsupervisedProvidedNetwork> {

		return new Promise<UnsupervisedProvidedNetwork>((resolve, reject) => {

			let describeModelInput: AWS.SageMaker.DescribeModelInput = {
				ModelName: name
			};

			sagemaker.describeModel(describeModelInput, (error: AWSError, data: AWS.SageMaker.Types.DescribeModelOutput) => {
				if (!error){
					resolve(SageMakerNetwork.createFromDescribeModelOutput(data))
				}else{
					this._getNetworkFromNewModel(name).then(resolve).catch(reject);
				}
			})
		});
	}

	private _getNetworkFromNewModel(name: string): Promise<UnsupervisedProvidedNetwork> {

		return new Promise<UnsupervisedProvidedNetwork>((resolve, reject) => {

			let createModelInput : AWS.SageMaker.CreateModelInput = {
				ModelName: name,
				PrimaryContainer:  {
					Image: '',
					Environment: {
						'name' : 'value'
					}
				},
				ExecutionRoleArn: 'todo'
			};

			sagemaker.createModel(createModelInput, (error: AWSError, data: AWS.SageMaker.Types.CreateModelOutput) => {
				if(!error) {
					resolve(SageMakerNetwork.createFromCreateModelOutput(data))
				} else {
					reject(error);
				}
			});

		})

	}

}