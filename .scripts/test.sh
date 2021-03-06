#!/usr/bin/env bash
set -e
echo "Running unit tests"
realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}
ABSPATH=$(realpath $0)
SCRIPTPATH=$(dirname ${ABSPATH})
BASEPATH=$(dirname ${SCRIPTPATH})

echo "Compiling typescript files"
${SCRIPTPATH}/compile.sh

echo "Running tests"
node ${BASEPATH}/node_modules/.bin/mocha --opts tests/mocha.opts tests/**/*.test.ts