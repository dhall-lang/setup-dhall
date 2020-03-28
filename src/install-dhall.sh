#!/bin/sh

echo "Downloading dhall from: $1"
wget --quiet $1

echo "Downloading dhall-json from: $2"
wget --quiet $2

# Extract dhall-json first, makes shell glob easier
tar --extract --bzip2 --file dhall-json-*.tar.bz2
rm -f dhall-json-*.tar.bz2

# Extract dhall now that dhall-json is done
tar --extract --bzip2 --file dhall-*.tar.bz2
rm -f dhall-*.tar.bz2

# Add the dhall executables to the path for future actions
echo "::add-path::$(pwd)/bin"
