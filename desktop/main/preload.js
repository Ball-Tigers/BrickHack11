const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('update-uri', (_event, value) => {
        window.location.href = window.location.origin + "/user_join_group?inviteCode=" + value;
    });
});