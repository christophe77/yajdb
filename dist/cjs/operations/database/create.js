"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileExistsAsync = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
const dbFullPath = (dbName) => path_1.default.join(dbRootPath, dbName);
function create(dbName) {
    if (fs_1.default.existsSync(dbFullPath(dbName))) {
        return {
            success: false,
            message: "db already exists",
        };
    }
    else {
        try {
            fs_1.default.mkdirSync(dbFullPath(dbName));
            return {
                success: true,
                message: `db created ${dbFullPath(dbName)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating db : ${error}`,
            };
        }
    }
}
exports.create = create;
async function createAsync(dbName) {
    const dbExists = await fileExistsAsync(dbFullPath(dbName));
    if (dbExists) {
        return {
            success: false,
            message: "db already exists",
        };
    }
    else {
        try {
            await fs_1.default.promises.mkdir(dbFullPath(dbName));
            return {
                success: true,
                message: `db created ${dbFullPath(dbName)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating db : ${error}`,
            };
        }
    }
}
exports.createAsync = createAsync;
