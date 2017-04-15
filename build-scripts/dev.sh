#!/usr/bin/env bash
set -e
rm -rf target

# . "$NVM_DIR/nvm.sh"
# nvm install
# nvm use
yarn install
npm run build
npm test

mkdir target

cd dist
tar -zcvf ../target/moe.tar.gz *
# tar -czf target/moe.tar.gz * --exclude dist
#tar -czf target/moe.tar.gz * --exclude target
