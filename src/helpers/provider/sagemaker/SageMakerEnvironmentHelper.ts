declare let ENV;

export class SageMakerEnvironmentHelper {
    private constructor() {}
    public static getAWSEnvironmentTag() {
        return {
            Key: 'environment',
            Value: ENV
        };
    }
}