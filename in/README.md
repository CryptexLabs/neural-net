[//]: # (Only edit this file if it is in $project/in directory. This file is compiled)
# Cryptex Neural Net #
Wrapper for training, and getting results from cryptex neural networks

![Build Status](https://codebuild.us-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiWHRrVk9iaWxpSnFHUVFuY3BjN2tSUWhkR3ZHRU1VbVViYlMwY05PMm1yWDFuU2lGSFlhUTY4c0ovUVJjQW9YOVRsYk5ka2RrRzhHcTRRc0lncUxIMi80PSIsIml2UGFyYW1ldGVyU3BlYyI6Ijc4MzNVMllzS29pcml4bmsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## How to install

```bash
npm install --save git+ssh://git@github.com/CryptexLabs/neural-net.git
```

## Before you test
Make sure your config.json file is filed out properly

[embedmd]:# (../examples/config-example.json json)

If you do not already have a config.json in the root of the project directory, then one will created from the example config. 
For more on configuring your IDE to run tests please se the section on [configuring your IDE to run tests](tests)

## How to test

```bash
npm test
```
If you do not configure the config.json before running your tests then your tests will fail because some of the tests are integration tests.

## How to train

[embedmd]:# (../examples/training-example.ts typescript)
    
## How to use

[embedmd]:# (../examples/load-result-example.ts typescript)

## How to create a new neural network
Please see [Network implementations](examples/network) for more information

## Other

### Easy load provider from default config

```typescript
import {NeuralNetService} from "./src/models/NeuralNetService";

let provider = NeuralNetService.getDefaultProvider();

```
This will load the config file from ./config.json and return the default network provider. It is designed for ease of use and is not required.

### Git hooks

#### pre-commit
If you cloned the project, when you run 
```bash
npm install
```
a pre-commit hook will automatically be installed. The pre-commit hook will compile the typescript and run the tests before 

#### post-receive
After each check-in a web hook will notify AWS CodeBuild service that a new version has been checked-in. The code will build and run the tests. If the tests fail the build will show as passing in this readme but an email will be sent to anyone subscribed to receiving notifications through the AWS SNS service. If you would like to receive notifications when there is a build failure please contact project owner.

### Using this project in a JavaScript project
If you want to use this TypeScript project in your JavaScript project you need to include the files in the ./build directory instead of the ./src

### Contributors
- Josh Woodcock
- Gordon Goodrum

### License
MIT

### Copyright
Cryptex Labs