"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAsync = exports.update = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../utils");
function update(dbName, tableName, searchPayload, replacePayload) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    if (fs_1.default.existsSync(tableFile)) {
        try {
            const rawData = fs_1.default.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const entries = (0, utils_1.searchEntries)(tableName, tableData, searchPayload);
                if (entries.length > 0) {
                    const updatedTableData = (0, utils_1.updateTableDatas)(tableData, entries, replacePayload);
                    fs_1.default.writeFileSync(tableFile, updatedTableData);
                }
                return {
                    success: true,
                    message: "row(s) updated",
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
                message: `error updating rows`,
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
exports.update = update;
async function updateAsync(dbName, tableName, searchPayload, replacePayload) {
    const tableFile = (0, utils_1.fullJsonPath)([dbName, tableName]);
    const fileExists = await (0, utils_1.fileExistsAsync)(tableFile);
    if (fileExists) {
        try {
            const rawData = await fs_1.default.promises.readFile(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const entries = (0, utils_1.searchEntries)(tableName, tableData, searchPayload);
                if (entries.length > 0) {
                    const updatedTableData = (0, utils_1.updateTableDatas)(tableData, entries, replacePayload);
                    await fs_1.default.promises.writeFile(tableFile, updatedTableData);
                }
                return {
                    success: true,
                    message: "row(s) updated",
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
                message: `error updating rows`,
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
exports.updateAsync = updateAsync;
