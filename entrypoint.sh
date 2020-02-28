#!/bin/sh -l

cabal update

package_name=dhall

if [ "$1" != "latest" ]
then
  package_name=dhall-$1
fi


cabal install $package_name --install-method=copy --installdir=/$package_name

echo "::add-path::/$package_name"
