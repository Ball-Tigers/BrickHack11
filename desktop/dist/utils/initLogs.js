"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLogs = initLogs;
const electron_log_1 = __importDefault(require("electron-log"));
const node_child_process_1 = require("node:child_process");
const node_path_1 = require("node:path");
const databasePath_1 = require("./databasePath");
async function initLogs() {
    const directoryPath = (0, node_path_1.join)(__dirname, "..", "..");
    const command = process.platform === "win32"
        ? `dir ${directoryPath}`
        : `ls -lah ${directoryPath}`;
    (0, node_child_process_1.exec)(command, (error, stdout, stderr) => {
        if (error) {
            electron_log_1.default.error(`ERROR IN ${command}:\n${error}`);
            electron_log_1.default.error(`ERROR IN ${command} "stderr":\n${stderr}`);
            return;
        }
        electron_log_1.default.log(`FILES IN DIRECTORY ${directoryPath}:\n${stdout}`);
    });
    electron_log_1.default.info("DIRNAME: ", directoryPath);
    electron_log_1.default.info("DATABASE: ", databasePath_1.databasePath);
}
