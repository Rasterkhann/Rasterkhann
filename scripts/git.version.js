const { writeFileSync } = require('fs');
const { promisify } = require('util');
const child = require('child_process');

const exec = promisify(child.exec);

async function createVersionsFile(filename) {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();

  console.log(`version: '${process.env.npm_package_version}', revision: '${revision}', branch: '${branch}'`);

  const content = `
export const version = {
  version: '${process.env.npm_package_version}',
  revision: '${revision}',
  branch: '${branch}'
};
`;

  writeFileSync(filename, content, { encoding: 'utf8' });
}

createVersionsFile('src/environments/versions.ts');
