"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAsync = exports.select = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../../utils");
const fileExistsAsync = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path_1.default.join(dbRootPath, dbName, tableName)}.json`;
function select(dbName, tableName, searchPayload) {
    const tableFile = tableFullPath(dbName, tableName);
    if (fs_1.default.existsSync(tableFile)) {
        try {
            const result = [];
            const rawData = fs_1.default.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const objSize = Object.keys(firstEntry).length;
                const searchPayloadSize = Object.keys(searchPayload).length;
                tableData[tableName].forEach((entry) => {
                    var _a;
                    const diffAmount = ((_a = (0, utils_1.getObjectDiff)(entry, searchPayload)) === null || _a === void 0 ? void 0 : _a.length) || 9999999999;
                    if (diffAmount === objSize - searchPayloadSize) {
                        result.push(entry);
                    }
                });
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
    const tableFile = tableFullPath(dbName, tableName);
    const tableExists = await fileExistsAsync(tableFile);
    if (tableExists) {
        try {
            const result = [];
            const rawData = fs_1.default.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const objSize = Object.keys(firstEntry).length;
                const searchPayloadSize = Object.keys(searchPayload).length;
                tableData[tableName].forEach((entry) => {
                    var _a;
                    const diffAmount = ((_a = (0, utils_1.getObjectDiff)(entry, searchPayload)) === null || _a === void 0 ? void 0 : _a.length) || 9999999999;
                    if (diffAmount === objSize - searchPayloadSize) {
                        result.push(entry);
                    }
                });
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
