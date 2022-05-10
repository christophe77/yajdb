"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropAsync = exports.drop = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileExists = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
const dbFullPath = (dbName) => path_1.default.join(dbRootPath, dbName);
function drop(dbName) {
    if (fs_1.default.existsSync(dbFullPath(dbName))) {
        try {
            fs_1.default.unlinkSync(dbFullPath(dbName));
            return {
                success: true,
                message: "db deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting db : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error db doesn't exist : ${dbFullPath(dbName)}`,
        };
    }
}
exports.drop = drop;
async function dropAsync(dbName) {
    const dbExists = await fileExists(dbFullPath(dbName));
    if (dbExists) {
        try {
            await fs_1.default.promises.unlink(dbFullPath(dbName));
            return {
                success: true,
                message: "db deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting db : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error db doesn't exist : ${dbFullPath(dbName)}`,
        };
    }
}
exports.dropAsync = dropAsync;
