
const { promisify } = require('util');
const child = require('child_process');

const exec = promisify(child.exec);

const version = require('../package.json').version;

async function rewriteVersion() {
  await exec(`git tag -d ${version}`);
  await exec(`git tag ${version}`);
}

rewriteVersion();

console.log(`Rewrote version to be post-changelog commit instead of pre-changelog commit.`);