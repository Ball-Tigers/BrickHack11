"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const utils_1 = require("../utils");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: utils_1.databasePath,
    logging: false,
});
exports.User = exports.sequelize.define("users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: "updateTimestamp",
    comment: "Users table",
});
