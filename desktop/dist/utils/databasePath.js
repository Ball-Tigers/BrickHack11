"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databasePath = void 0;
const electron_log_1 = __importDefault(require("electron-log"));
const main_1 = require("electron/main");
const node_path_1 = require("node:path");
exports.databasePath = (0, node_path_1.join)(main_1.app.getPath("userData"), "database.sqlite");
electron_log_1.default.info("DATABASE: ", exports.databasePath);
