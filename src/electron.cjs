const { app, ipcMain, globalShortcut, shell } = require('electron');
const { BrowserWindow, Menu } = require('electron');
const serve = require('electron-serve');
const path = require('path');

const loadUrl = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const isDev = !app.isPackaged || (process.env.NODE_ENV == 'development');

const maximize = false;

let mainWindow;

const loadDev = () => mainWindow
    .loadURL(`http://localhost:${port}`)
    .catch(() => {
        setTimeout(() => { loadDev(); }, 200);
    });

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 940,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.cjs')
        },
        titleBarStyle: 'hidden'
    });

    const webContents = mainWindow.webContents;

    webContents.once('did-finish-load', () => {
        mainWindow.show();
    });

    if (!isDev) mainWindow.removeMenu();
    else webContents.openDevTools();

    if (maximize) mainWindow.maximize();

    webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('maximize', () => webContents.send('maximize'));
    mainWindow.on('unmaximize', () => webContents.send('unmaximize'));

    globalShortcut.register('F11', () => {
        if (mainWindow.isFocused()) {
            let fullscreen = !mainWindow.isFullScreen();
            mainWindow.setFullScreen(fullscreen);
            webContents.send('fullscreen', fullscreen);
        }
    });

    if (isDev) loadDev();
    else loadUrl(mainWindow);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('minimize', () => mainWindow.minimize());

ipcMain.on('maximize', () => mainWindow.maximize());

ipcMain.on('unmaximize', () => mainWindow.unmaximize());

ipcMain.on('close', () => mainWindow.close());

ipcMain.on('show-context-menu', (event) => {
    const template = [{ role: 'close' }];
    const menu = Menu.buildFromTemplate(template);
    menu.popup(BrowserWindow.fromWebContents(event.sender));
});
