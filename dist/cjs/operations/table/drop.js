"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropAsync = exports.drop = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
function drop(dbName, tableName) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    if (fs_1.default.existsSync(tableFile)) {
        try {
            fs_1.default.unlinkSync(tableFile);
            return {
                success: true,
                message: "table deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting table : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error table doesn't exist : ${tableFile}`,
        };
    }
}
exports.drop = drop;
async function dropAsync(dbName, tableName) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const dbExists = await (0, utils_1.fileExistsAsync)(tableFile);
    if (dbExists) {
        try {
            await fs_1.default.promises.unlink(tableFile);
            return {
                success: true,
                message: "table deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting table : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error table doesn't exist : ${tableFile}`,
        };
    }
}
exports.dropAsync = dropAsync;
