#!/usr/bin/env bash
set -e
rm -rf target

#nvm install
yarn install
npm run build:stg
npm test

mkdir target

cd dist
tar -zcvf ../target/moe.tar.gz *
#tar -zcvf target/moe.tar.gz ./dist/
