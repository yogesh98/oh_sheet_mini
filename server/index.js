const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const nodePath = path.join('file://', __dirname, 'src/app.js');
console.log(nodePath);
let loaded = false;
(async () => {
  try {
    const { serveReactApp } = await import(nodePath);
    // Start express server that is serving reactapp
    loaded = await serveReactApp();
  } catch (error) {
    console.log(error);
    loaded = error;
  }
})();

let mainWindow;
let loaderWindow;

const createWindow = () => {
  loaderWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
  });
  loaderWindow.loadFile(path.join(__dirname, 'electron/loader.html'));


  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  setTimeout(() => {
    // Load page served by node
    const reactApp = "http://localhost:4001/";
    
    mainWindow.loadURL(reactApp);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.focus();

    loaderWindow.destroy();
  }, 2000);

});

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
