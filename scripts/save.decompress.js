
const { decompressFromUTF16 } = require('lz-string');
const fs = require('fs');
const path = require('path');

const file = path.basename(process.argv[2], '.sav');
const dir = path.parse(path.resolve(process.argv[2])).dir;

fs.writeFileSync(
  `${dir}/${file}.json`,
  decompressFromUTF16(
    fs.readFileSync(process.argv[2]).toString()
  )
);
