const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    chooseFile: async () => await ipcRenderer.invoke('chooseFile')
});

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('update-uri', (_event, value) => {
        window.location.href = window.location.origin + "/user_join_group?inviteCode=" + value;
    });
});