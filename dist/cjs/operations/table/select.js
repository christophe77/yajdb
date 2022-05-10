"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAsync = exports.select = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
function select(dbName, tableName, searchPayload) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    if (fs_1.default.existsSync(tableFile)) {
        try {
            const rawData = fs_1.default.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const result = (0, utils_1.searchEntries)(tableName, tableData, searchPayload);
                return {
                    success: true,
                    message: JSON.stringify(result),
                };
            }
            return {
                success: false,
                message: `table is empty`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error selecting payload`,
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
exports.select = select;
async function selectAsync(dbName, tableName, searchPayload) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const tableExists = await (0, utils_1.fileExistsAsync)(tableFile);
    if (tableExists) {
        try {
            const rawData = fs_1.default.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const result = (0, utils_1.searchEntries)(tableName, tableData, searchPayload);
                return {
                    success: true,
                    message: JSON.stringify(result),
                };
            }
            return {
                success: false,
                message: `table is empty`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error selecting payload`,
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
exports.selectAsync = selectAsync;
