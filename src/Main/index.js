/* eslint-disable import/no-extraneous-dependencies */
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const {
  app, BrowserWindow, ipcMain, session
} = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const filter = {
  urls: ['https://api.myanimelist.net/*']
};

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // console.log(MAIN_WINDOW_WEBPACK_ENTRY);
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  ipcMain.handle('authenticate', (event, code_challenge) => {
    const mal_connection_config = {
      response_type: 'code',
      client_id: '68f252ca363090ac927bb8c566a810f6',
      code_challenge,
      state: 'requestTest1',
    };
    const malUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=${mal_connection_config.response_type}&client_id=${mal_connection_config.client_id}&code_challenge=${mal_connection_config.code_challenge}&state=${mal_connection_config.state}`;
    mainWindow.loadURL(malUrl);
  });
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

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
