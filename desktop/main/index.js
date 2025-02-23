import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import getMAC from "getmac";
import fs from "fs";
import os from "os";

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
            win.webContents.openDevTools();
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

app.on("second-instance", (e, argv) => {
    let uri = null;
    for(const arg of argv) {
        if(arg.startsWith('jafe')) {
            uri = arg.split("jafe://")[1].replace(/\//g, '');
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

ipcMain.handle('chooseFile', async (event) => {
    return (await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender), {
        properties: ['openFile']
    })).filePaths[0];
});

ipcMain.handle('getOrganizations', async () => {
    const options = {
        headers: {
            Accept: 'application/json',
            MAC: getMAC()
        }
    };

    return await (fetch('http://localhost:5000/api/organization', options).then(res => {
        return res.json()
    }));
});

ipcMain.handle('uploadFile', async (_event, data) => {
    const { filePath, selectedOrg, selectedGroup } = data;

    const form = new FormData();
    form.append('orgId', selectedOrg);
    form.append('groupName', selectedGroup);
    form.append('file', new Blob([fs.readFileSync(filePath)]), path.basename(filePath));

    return await fetch('http://localhost:5000/api/file/upload', {
        method: 'POST',
        headers: {
            MAC: getMAC()
        },
        body: form
    }).then(res => res.json());
});

ipcMain.handle('downloadFile', async (_event, data) => {
    const { fileKey } = data;

    const file = await fetch(`http://localhost:5000/api/file?fileKey=${fileKey}`).then(res => {
        return res.json();
    });
    const filePath = path.join(os.homedir(), 'Downloads', file.fileName);

    const options = {
        headers: {
            MAC: getMAC()
        }
    }

    return await fetch(`http://localhost:5000/api/file/download?fileKey=${fileKey}`, options)
    .then(res => res.blob()).then(blob => {
        return blob.arrayBuffer()
    }).then(arrBuffer => {
        return Buffer.from(arrBuffer);
    }).then(res => {
        console.log("Writing to " + filePath);
        fs.writeFileSync(filePath, res, 'binary');
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });
});

ipcMain.handle('acceptGroup', async (_event, data) => {
    const { name, inviteCode } = data;

    return await fetch('http://localhost:5000/api/organization/group/invite/accept', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            inviteCode: inviteCode,
            macAddress: getMAC()
        }),
    }).then(res => {return res.json()});
});
