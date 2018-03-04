#!/usr/bin/env bash
echo "Running unit tests"
node ./node_modules/.bin/mocha --require tests/bootstrap.ts --recursive tests