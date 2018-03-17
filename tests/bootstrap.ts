declare module NodeJS  {
	interface Global {
		AWS: any,
		ENV: string
	}
}
global.ENV = 'TEST';
global.AWS = require('aws-sdk');
let options = {
	'region': 'us-west-2'
};
declare let AWS;
AWS.config.update(options);