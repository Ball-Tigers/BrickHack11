const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    chooseFile: async () => await ipcRenderer.invoke('chooseFile'),
    getOrganizations: () => ipcRenderer.invoke('getOrganizations'),
    uploadFile: async (data) => await ipcRenderer.invoke('uploadFile', data),
    downloadFile: async (data) => await ipcRenderer.invoke('downloadFile', data),
    acceptGroup: async (data) => await ipcRenderer.invoke('acceptGroup', data)
});

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('update-uri', (_event, value) => {
        window.location.href = window.location.origin + "/user_join_group?inviteCode=" + value;
    });
});