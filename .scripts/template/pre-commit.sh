#!/usr/bin/env bash
realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}
ABSPATH=$(realpath $0)
BASEPATH=$(dirname $(dirname $(dirname ${ABSPATH})))
${BASEPATH}/.scripts/pre-commit.sh