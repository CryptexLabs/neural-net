import {SageMakerRuntime} from "aws-sdk";

/**
 * This class is a workaround hack for SageMaker's missing invokeEndpoint method
 */
export class SageMakerEndpointHack {

    private _runtime: SageMakerRuntime;

    constructor(region: string) {
        this._runtime = new SageMakerRuntime({
            apiVersion: '2017-05-13',
            region: region,
            endpoint: `https://runtime.sagemaker.${region}.amazonaws.com`,
        });
    }

    public invokeEndpoint(endpointName: string, body: any): Promise<any> {

        const params = {
            Body: JSON.stringify(body),
            EndpointName: endpointName,
            ContentType: 'application/json',
            Accept: 'application/json',
        };

        return this._runtime.invokeEndpoint(params).promise()
            .then((data: SageMakerRuntime.Types.InvokeEndpointOutput)=>{
                let body = JSON.parse(data.Body.toString());
                return Promise.resolve(body);
            });

    }

}