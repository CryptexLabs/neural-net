#!/usr/bin/env bash
realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}
ABSPATH=$(realpath $0)
SCRIPTPATH=$(dirname ${ABSPATH})
BASEPATH=$(dirname ${SCRIPTPATH})

if [ -d ${BASEPATH}/.git ]; then
    echo "Updating development environment settings"
    cp ${BASEPATH}/.scripts/template/pre-commit.sh ${BASEPATH}/.git/hooks/pre-commit
    chmod +x ${BASEPATH}/.git/hooks/pre-commit
fi;

if [ ! -f ${BASEPATH}/config.json ]; then
    echo "Creating config file from example config file"
    cp ${BASEPATH}/config-example.json ${BASEPATH}/config.json
fi