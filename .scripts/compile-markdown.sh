#!/usr/bin/env bash
echo "Compiling markdown"
realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}
ABSPATH=$(realpath $0)
SCRIPTPATH=$(dirname ${ABSPATH})
BASEPATH=$(dirname ${SCRIPTPATH})

if [ ! -f /usr/local/opt/go/bin/bin/embedmd ]; then
    echo "embedmd not installed"
    echo "Please install via https://github.com/campoy/embedmd"
    exit 0
else
    /usr/local/opt/go/bin/bin/embedmd ${BASEPATH}/in/examples/network/README.md > ${BASEPATH}/examples/network/README.md
    /usr/local/opt/go/bin/bin/embedmd ${BASEPATH}/in/README.md > ${BASEPATH}/README.md
    cd ${BASEPATH}
    git add ${BASEPATH}/examples/network/README.md
    git add ${BASEPATH}/README.md
    exit 0
fi