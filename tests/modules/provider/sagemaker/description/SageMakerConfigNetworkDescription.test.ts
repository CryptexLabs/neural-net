import 'mocha';
import * as chai from "chai";
import {SageMakerConfigNetworkDescription} from "../../../../../src/module/provider/sagemaker/models/description/SageMakerConfigNetworkDescription";
import {SageMakerInferenceImageAlgorithm} from "../../../../../src/module/provider/sagemaker/interfaces/description/SageMakerInferenceImageDescriptions";
import {NeuralNetOutput} from "../../../../../src/interface/output/NeuralNetOutput";

let itParam = require('mocha-param');

describe('SageMakerConfigNetworkDescription', () => {

	class TestOutput implements NeuralNetOutput {}

	function getDataForContainerImage() {
		return [
			{
				region        : "us-west-2",
				algorithm     : SageMakerInferenceImageAlgorithm.kmeans,
				containerImage: "174872318107.dkr.ecr.us-west-2.amazonaws.com"
			},// US West (Oregon).
			{
				region        : "us-east-1",
				algorithm     : SageMakerInferenceImageAlgorithm.kmeans,
				containerImage: "382416733822.dkr.ecr.us-east-1.amazonaws.com"
			},// US East (N. Virginia).
			{
				region        : "us-east-2",
				algorithm     : SageMakerInferenceImageAlgorithm.kmeans,
				containerImage: "404615174143.dkr.ecr.us-east-2.amazonaws.com"
			},// US East (Ohio).
			{
				region        : "eu-west-1",
				algorithm     : SageMakerInferenceImageAlgorithm.kmeans,
				containerImage: "438346466558.dkr.ecr.eu-west-1.amazonaws.com"
			},// EU (Ireland).
		];
	}

	function getDataForUniqueName() {
		return [
			{name: "testName01"},
		];
	}

	function getDataForUrl(){
		return [
			{url: "s4://buckets/item.tar.gz"},
			{url: "s3://bucket/item.tar"},
			{url: "s3://item.tar.gz"},
			{url: "https://s3-us-west-2.amazonaws.com/bucket/test.tar.gz"},
		];
	}

	function getDataForNotYetSupportedRegion() {
		return [
			//  Asia Pacific (Tokyo).
			{region: "ap-northeast-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// Asia Pacific (Seoul)
			{region: "ap-northeast-2", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// Asia Pacific (Mumbai)
			{region: "ap-south-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// Asia Pacific (Singapore)
			{region: "ap-southeast-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// Asia Pacific (Syndey)
			{region: "ap-southeast-2", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// Canada Central
			{region: "ca-central-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// EU (Frankfurt)
			{region: "eu-central-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// EU (London)
			{region: "eu-west-2", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// EU (Paris)
			{region: "eu-west-3", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// South America (Sao Paulo)
			{region: "sa-east-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// US West (N. California)
			{region: "us-west-1", algorithm: SageMakerInferenceImageAlgorithm.kmeans, exceptionString: "region"},
			// US West (N. California)
			{region: "us-west-2", algorithm: "deepar", exceptionString: "algorithm"},
		];
	}

	itParam("should throw exception for not yet supported algorithm region pair ${value.region} (algorithm ${value.algorithm})", getDataForNotYetSupportedRegion(), function(testData) {

		chai.expect(() => {
			return new SageMakerConfigNetworkDescription("testName", testData.region, testData.algorithm, TestOutput)
		})
			.to.throw(testData.exceptionString);
	});

	itParam("should return a container image for ${value.region} (image ${value.containerImage})", getDataForContainerImage(), function(testData) {
		let config = new SageMakerConfigNetworkDescription("testName", testData.region, testData.algorithm, TestOutput);

		let image = config.getContainerImage();
		chai.assert.isNotNull(image);
		chai.assert.equal(image, testData.containerImage)

	});

	itParam("should return a unique name for ${value.name} (name ${value.uniqueName})", getDataForUniqueName(), function(testData) {
		let config = new SageMakerConfigNetworkDescription(testData.name, "us-west-2", SageMakerInferenceImageAlgorithm.kmeans, TestOutput);

		chai.assert.equal(config.getUniqueName(), testData.name)

	});

	itParam("should throw an exception for invalid url ${value.name} (name ${value.uniqueName})", getDataForUrl(), function(testData) {
		chai.expect(() => {
			let config = new SageMakerConfigNetworkDescription("testName", "us-west-2", SageMakerInferenceImageAlgorithm.kmeans, TestOutput);
			config.setModelDataUrl(testData.url);
			return config;
		})
			.to.throw('url');
	});

	it("should get Data Model Url", function() {
		let config = new SageMakerConfigNetworkDescription("testName", "us-west-2", SageMakerInferenceImageAlgorithm.kmeans, TestOutput);
		config.setModelDataUrl('s3://bucket-mame/test.tar.gz');

		chai.assert.equal(config.getModelDataUrl(), 's3://bucket-mame/test.tar.gz');
	})


});