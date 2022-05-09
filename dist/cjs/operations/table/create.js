"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileExistsAsync = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path_1.default.join(dbRootPath, dbName, tableName)}.json`;
function create(dbName, tableName, structure) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
    if (fs_1.default.existsSync(tableFile)) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: []
            };
            fs_1.default.writeFileSync(tableStructureFile, `{ "structure" : ${JSON.stringify(structure)}}`);
            fs_1.default.writeFileSync(tableFile, JSON.stringify(initialValue));
            return {
                success: true,
                message: `table created ${tableFile}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
            };
        }
    }
}
exports.create = create;
async function createAsync(dbName, tableName, structure) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
    const dbExists = await fileExistsAsync(tableFile);
    if (dbExists) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: []
            };
            await fs_1.default.promises.writeFile(tableStructureFile, `{ "structure" : ${JSON.stringify(structure)}}`);
            await fs_1.default.promises.writeFile(tableFile, JSON.stringify(initialValue));
            return {
                success: true,
                message: `table created ${tableFile}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
            };
        }
    }
}
exports.createAsync = createAsync;
