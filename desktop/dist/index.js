"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const database_1 = require("./database");
const utils_1 = require("./utils");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: (0, node_path_1.join)(__dirname, "preload.js"),
            devTools: false,
        },
    });
    win.setMenu(null);
    if (utils_1.isDev) {
        win.loadURL("http://localhost:4444/");
        win.webContents.openDevTools();
        win.maximize();
    }
    else {
        win.loadFile((0, node_path_1.join)(__dirname, "..", "frontend", "out", "index.html"));
    }
}
electron_1.app.whenReady().then(async () => {
    await (0, utils_1.prepareNext)("./frontend", 4444);
    await (0, utils_1.initLogs)();
    await database_1.sequelize
        .sync({
        logging: true,
        alter: true,
        force: false,
    })
        .then(() => {
        console.log("Database synced");
    });
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.on("addUser", async (event, data) => {
    await database_1.User.create(data)
        .then((data) => {
        event.returnValue = {
            error: false,
            data: data.dataValues,
        };
    })
        .catch((error) => {
        event.returnValue = {
            error: true,
            data: error,
        };
    });
});
