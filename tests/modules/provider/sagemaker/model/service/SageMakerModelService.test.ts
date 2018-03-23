import 'mocha';
import 'reflect-metadata';
import * as chai from 'chai';
import {Container} from "inversify";
import {SageMakerModelService} from "../../../../../../src/module/provider/sagemaker/model/service/SageMakerModelService";
import {NeuralNetServiceHelper} from "../../../../../../src/helper/NeuralNetServiceHelper";
import {SageMakerNeuralNetConfig} from "../../../../../../src/module/provider/sagemaker/interface/config/SageMakerNeuralNetConfig";
import {NetworkDescriptor} from "../../../../../../src/interface/description/NetworkDescriptor";
import {SageMakerNetworkDescriptor} from "../../../../../../src/module/provider/sagemaker/interface/description/SageMakerNetworkDescriptor";
import {SageMaker} from "aws-sdk";
import {SageMakerKMeansNeuralNetOutput} from "../../../../../../src/module/provider/sagemaker/model/output/kmeans/SageMakerKMeansNeuralNetOutput";
import {NeuralNetInput} from "../../../../../../src/interface/input/NeuralNetInput";

interface D extends SageMakerNetworkDescriptor, NetworkDescriptor {
}

describe('SageMakerModelService', () => {

    let context: Container;
    let config = NeuralNetServiceHelper.getDefaultConfig().amazon.sagemaker;

    beforeEach(() => {
        context = new Container();
        context.bind<SageMakerModelService>(SageMakerModelService).toSelf();
        context.bind<SageMakerNeuralNetConfig>("Config").toConstantValue(config);
    });

    it('should get a sagemaker model description', (done) => {

        let description: D = {
            getContainerImage(): string {return 'fake/docker/image' },
            getModelDataUrl(): string { return undefined; },
            getUniqueName(): string { return "TESTA" },
        };

        context.bind<D>("Assistant").toConstantValue(description);

        context.get<SageMakerModelService>(SageMakerModelService)
            .getModel()
            .then((model: SageMaker.DescribeModelOutput) => {
                chai.expect(model).to.not.be.null
            })
            .then(done)
            .catch(chai.assert.fail);

    }).timeout(10000);

    it('should not get a sagemaker model description', (done) => {

        let description: D = {
            getContainerImage(): string {return 'fake/docker/image' },
            getModelDataUrl(): string { return undefined; },
            getUniqueName(): string { return "SomeNonExistentModel" },
        };

        context.bind<D>("Assistant").toConstantValue(description);

        context.get<SageMakerModelService>(SageMakerModelService)
            .getModel()
            .then((model: SageMaker.DescribeModelOutput) => {
                chai.assert.fail('There is not model called SomeNonExistentModel');
            }, (error: Error)=>{
                chai.expect(error).is.not.null;
                chai.expect(error).is.not.undefined;
            })
            .then(done)
            .catch(done)


    }).timeout(10000);


});