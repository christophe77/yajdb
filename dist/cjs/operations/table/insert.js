"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAsync = exports.insert = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
function insert(dbName, tableName, values) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
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
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const tableExists = await (0, utils_1.fileExistsAsync)(tableFile);
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
