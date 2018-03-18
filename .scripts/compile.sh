#!/usr/bin/env bash
realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}
ABSPATH=$(realpath $0)
SCRIPTPATH=$(dirname ${ABSPATH})
BASEPATH=$(dirname ${SCRIPTPATH})

if ${BASEPATH}/node_modules/typescript/bin/tsc | grep -q 'error' ; then
    ${BASEPATH}/node_modules/typescript/bin/tsc -p ${BASEPATH}/tsconfig.json
    exit 1
else
    exit 0
fi