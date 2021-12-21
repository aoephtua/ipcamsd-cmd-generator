const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');

const loadUrl = serve({ directory: '.' });

const maximize = false;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 940,
        show: !maximize,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.removeMenu();

    if (maximize) mainWindow.maximize();

    loadUrl(mainWindow);
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
