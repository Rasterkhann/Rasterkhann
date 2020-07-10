
const { compressToUTF16 } = require('lz-string');
const fs = require('fs');
const path = require('path');

const file = path.basename(process.argv[2], '.json');
const dir = path.parse(path.resolve(process.argv[2])).dir;

fs.writeFileSync(
  `${dir}/${file}.sav`,
  compressToUTF16(
    fs.readFileSync(process.argv[2]).toString()
  )
);
