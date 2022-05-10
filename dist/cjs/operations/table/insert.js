"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAsync = exports.insert = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileExistsAsync = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path_1.default.join(dbRootPath, dbName, tableName)}.json`;
function insert(dbName, tableName, values) {
    const tableFile = tableFullPath(dbName, tableName);
    if (fs_1.default.existsSync(tableFile)) {
        try {
            const rawData = fs_1.default.readFileSync(tableFile);
            const currentTableData = JSON.parse(rawData.toString());
            const updatedTableData = Object.assign({}, currentTableData);
            values.forEach(value => updatedTableData[tableName].push(value));
            fs_1.default.writeFileSync(tableFile, JSON.stringify(updatedTableData));
            return {
                success: true,
                message: `data inserted ${JSON.stringify(values)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
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
exports.insert = insert;
async function insertAsync(dbName, tableName, values) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableExists = await fileExistsAsync(tableFile);
    if (tableExists) {
        try {
            const rawData = await fs_1.default.promises.readFile(tableFile);
            const currentTableData = JSON.parse(rawData.toString());
            const updatedTableData = Object.assign({}, currentTableData);
            values.forEach(value => updatedTableData[tableName].push(value));
            await fs_1.default.promises.writeFile(tableFile, JSON.stringify(updatedTableData));
            return {
                success: true,
                message: `data inserted ${JSON.stringify(values)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
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
exports.insertAsync = insertAsync;
