global.ENV = 'TEST';
global.AWS = require('aws-sdk');
let options = {
    'region': 'us-west-2'
};
AWS.config.update(options);
//# sourceMappingURL=bootstrap.js.map