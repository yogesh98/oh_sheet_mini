const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const reactApp = express();
  reactApp.disable('x-powered-by');

  // setup cors for all routes
  reactApp.use(cors());

  // enable pre-flight cors
  reactApp.options('*', cors());

  // Implement middleware
  reactApp.use(express.urlencoded({ extended: true }));
  reactApp.use(express.json({ limit: '1mb' }));
  // serve react
  reactApp.use(express.static(path.join(__dirname, '../../client/build')));

  reactApp.get('*', (req, res) => {
    res.sendFile(
      resolve(__dirname, '../../client/build/index.html'),
    );
  });


  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000")
  // mainWindow.loadFile(path.join(__dirname, '../../client/build/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
