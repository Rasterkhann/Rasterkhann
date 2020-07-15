const fs = require('fs');
const path = require('path');
const os = require('os');

const { compressToUTF16, decompressFromUTF16 } = require('lz-string');

const folder = os.homedir() + '/Documents/Rasterkhann';
const savefileLoc = path.join(folder, 'Rasterkhann.sav');

window.isDownloaded = true;

window.saveCurrentSavefile = (saveData) => {
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(savefileLoc, compressToUTF16(JSON.stringify(saveData)), 'UTF-8');
};

window.loadCurrentSavefile = () => {
  try {

    const baseFile = JSON.parse(decompressFromUTF16(fs.readFileSync(savefileLoc, 'UTF-8')));
    return baseFile;
  } catch(e) {

    // back up existing savefile in case loading it is busted
    if(fs.existsSync(savefileLoc)) {
      fs.copyFileSync(savefileLoc, path.join(folder, `Rasterkhann-${Date.now()}.sav`));
    }
    
    return {};
  }
};