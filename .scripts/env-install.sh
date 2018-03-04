#!/usr/bin/env bash
echo "Updating development environment settings"
cp .scripts/template/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit