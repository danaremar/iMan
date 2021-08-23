const { app, BrowserWindow } = require("electron");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        minWidth: 600,
        minHeight: 400,
        width: 900,
        height: 600,
        title: "iMan",
        resizable: true,
        frame: false,
        icon: "src/favicon.ico",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

minimize = () => {
    var window = remote.getCurrentWindow();
    window.minimize();
}

maximize = () => {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
}

closeWindow = () => {
    var window = remote.getCurrentWindow();
    window.close();
}

// document.getElementById("min-btn").addEventListener("click", function (e) {
//     var window = remote.getCurrentWindow();
//     window.minimize(); 
// });

// document.getElementById("max-btn").addEventListener("click", function (e) {
//     var window = remote.getCurrentWindow();
//     if (!window.isMaximized()) {
//         window.maximize();          
//     } else {
//         window.unmaximize();
//     }
// });

// document.getElementById("close-btn").addEventListener("click", function (e) {
//     var window = remote.getCurrentWindow();
//     window.close();
// }); 