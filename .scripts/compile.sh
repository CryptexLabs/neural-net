#!/usr/bin/env bash
if ./node_modules/typescript/bin/tsc | grep -q 'error' ; then
    ./node_modules/typescript/bin/tsc
    exit 1
else
    exit 0
fi