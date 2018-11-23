#!/usr/bin/env node

const parseCmdArgs = () => {
  const params = {};
  for (let i = 2; i < process.argv.length;) {
    if (!process.argv[i + 1]) {
      params[process.argv[i].slice(2)] = true;
      i++;
    } else {
      const isNextIdent = process.argv[i + 1].startsWith('--');
      params[process.argv[i].slice(2)] = isNextIdent ? true : process.argv[i + 1];
      i += isNextIdent ? 1 : 2;
    }
  }
  return params;
};

const checkParams = params => {
  // TODO: add validation, dash to camel
  if (!params.bucket) {
    throw new Error('Bucket name should be set');
  }
  return params;
};

require('../src/index')(checkParams(parseCmdArgs()))
  .then(() => console.log('Execution complete'))
  .catch(err => {
    console.log('Execution failed');
    console.log(err);
    process.exit(1);
  });
