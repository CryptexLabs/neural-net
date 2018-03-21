declare let ENV;
export class SageMakerEnvironmentHelper {
    public static getAWSEnvironmentTag() {
        return {
            Key: 'environment',
            Value: ENV
        };
    }
}