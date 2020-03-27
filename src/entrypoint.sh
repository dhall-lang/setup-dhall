#!/bin/sh
set -e

apk add --quiet --no-progress curl jq

echo "Installing dhall version: $1"

url_path=latest

if [ "$1" != "latest" ]
then
  url_path="tags/$1"
fi

curl -s https://api.github.com/repos/dhall-lang/dhall-haskell/releases/$url_path > releases.json

core_download_url=$(jq --from-file src/core-release-filter.jq releases.json | tr -d '"')
json_download_url=$(jq --from-file src/json-release-filter.jq releases.json | tr -d '"')

# Cleanup to make sure the download can't fail
rm -f releases.json
rm -f dhall-*

echo "Downloading dhall from: $core_download_url"
wget --quiet $core_download_url

echo "Downloading dhall-json from: $json_download_url"
wget --quiet $json_download_url

# Extract dhall-json first, makes shell glob easier
tar --extract --bzip2 --file dhall-json-*-linux.tar.bz2
rm -f dhall-json-*-linux.tar.bz2

# Extract dhall now that dhall-json is done
tar --extract --bzip2 --file dhall-*-linux.tar.bz2
rm -f dhall-*-linux.tar.bz2

# Add the dhall executables to the path for future actions
echo "::add-path::$(pwd)/bin"
