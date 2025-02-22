"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = void 0;
const electron_log_1 = __importDefault(require("electron-log"));
exports.isDev = process.argv.some((str) => str == "--dev");
electron_log_1.default.info("IS_DEV: ", exports.isDev);
