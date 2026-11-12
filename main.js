const { app, BrowserWindow } = require("electron");

function createWindow() {

    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true
    });

    win.loadFile("index.html");

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
});