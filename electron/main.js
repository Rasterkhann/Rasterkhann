const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');
const DiscordRPC = require('discord-rpc');
const Config = require('electron-config');


const config = new Config();
const devMode = isDev;

let mainWindow;

function createWindow () {
  
  const preload = devMode ? path.join(__dirname, 'preload.js') : 'preload.js';

  // Create the browser window.
  const opts = { 
    show: false, 
    icon: path.join(__dirname, '..', 'www', 'assets', 'favicon', 'favicon.ico'),
    webPreferences: {
      preload
    }
  };

  Object.assign(opts, config.get('winBounds'));

  if(!opts.height) opts.height = 768;
  if(!opts.width) opts.width = 1024;

  mainWindow = new BrowserWindow(opts);
  mainWindow.setMenu(null);

  mainWindow.once('ready-to-show', mainWindow.show);

  // if we're in dev mode, load localhost
  if(devMode) {
    mainWindow.loadURL('http://localhost:9983');

  // otherwise load the local compiled app
  } else { 
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'www', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

  }

  mainWindow.on('close', () => {
    config.set('winBounds', mainWindow.getBounds());
  });

  mainWindow.on('opened', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  // Open the DevTools.
  if(devMode) {
    mainWindow.webContents.openDevTools();
  }
    
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const DISCORD_CLIENT_ID = '732947934378983445';

DiscordRPC.register(DISCORD_CLIENT_ID);

let startTimestamp = new Date();

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

const setActivity = () => {
  if(!rpc || !mainWindow) return;

  rpc.setActivity({
    startTimestamp,
    state: 'Managing Central Rasterkhann',
    largeImageKey: 'centralrasterkhann' || 'default',
    largeImageText: 'Central Rasterkhann'
  });
    
};

rpc.on('ready', function() {
  setActivity();

  setInterval(function() {
    setActivity();
  }, 15000);
});

rpc
  .login({ clientId: DISCORD_CLIENT_ID })
  .catch((err) => {
    console.error(err);
  });