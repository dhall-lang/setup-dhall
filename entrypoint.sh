#!/bin/sh
set -e

apk add --quiet --no-progress curl jq

echo "Installing Dhall version: $1"

url_path=latest

if [ "$1" != "latest" ]
then
  url_path="tags/$1"
fi

curl -s https://api.github.com/repos/dhall-lang/dhall-haskell/releases/$url_path > releases.json

download_url=$(jq --from-file release-filter.jq releases.json | tr -d '"')

# Cleanup to make sure the download can't fail
rm -rf dhall-*

echo "Downloading Dhall from: $download_url"

wget --quiet $download_url

tar --extract --bzip2 --file dhall-*-x86_64-linux.tar.bz2

echo "::add-path::$(pwd)/bin"
