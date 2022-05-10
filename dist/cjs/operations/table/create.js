"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsync = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
function create(dbName, tableName, structure) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const tableStructureFile = (0, utils_1.fullJsonPath)([dbName, `${tableName}-col`]);
    if (fs_1.default.existsSync(tableFile)) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: [],
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
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const tableStructureFile = (0, utils_1.fullJsonPath)([dbName, `${tableName}-col`]);
    const dbExists = await (0, utils_1.fileExistsAsync)(tableFile);
    if (dbExists) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: [],
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
