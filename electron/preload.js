const fs = require('fs');
const path = require('path');
const os = require('os');

const { compressToUTF16, decompressFromUTF16 } = require('lz-string');

const folder = os.homedir() + '/Documents/Rasterkhann';

window.isDownloaded = true;

window.saveCurrentSavefile = (saveData) => {
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'Rasterkhann.sav'), compressToUTF16(JSON.stringify(saveData)), 'UTF-8');
};

window.loadCurrentSavefile = () => {
  try {

    const baseFile = JSON.parse(decompressFromUTF16(fs.readFileSync(path.join(folder, 'Rasterkhann.sav'), 'UTF-8')));
    return baseFile;
  } catch(e) {

    return {};
  }
};