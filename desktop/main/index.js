import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
    const primaryInstance = app.requestSingleInstanceLock();
    if(!primaryInstance) {
        app.quit();
        return;
    }

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.setMenu(null)

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL("http://localhost:3000");
            // win.webContents.openDevTools();
            win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

app.on("ready", () => {
    if(process.platform === 'win32') {
        app.setAsDefaultProtocolClient("jafe", process.execPath, [app.getAppPath()]);
    } else if(process.platform === 'darwin') {
        app.setAsDefaultProtocolClient("jafe");
    }

    createWindow();
});

app.on("open-url", (e, data) => {
    e.preventDefault();

    console.log(data);
});

app.on("second-instance", (e, argv) => {
    let uri = null;
    for(const arg of argv) {
        if(arg.startsWith('jafe')) {
            uri = arg.split("jafe://")[1].replace(/\//g, '');
            console.log(uri)
            break;
        }
    }
    BrowserWindow.getAllWindows()[0].send('update-uri', uri);
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});