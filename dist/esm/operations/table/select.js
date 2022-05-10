import fs from "fs";
import path from "path";
import { getObjectDiff } from "../../utils";
const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path.join(dbRootPath, dbName, tableName)}.json`;
export function select(dbName, tableName, searchPayload) {
    const tableFile = tableFullPath(dbName, tableName);
    if (fs.existsSync(tableFile)) {
        try {
            const result = [];
            const rawData = fs.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const objSize = Object.keys(firstEntry).length;
                const searchPayloadSize = Object.keys(searchPayload).length;
                tableData[tableName].forEach((entry) => {
                    var _a;
                    const diffAmount = ((_a = getObjectDiff(entry, searchPayload)) === null || _a === void 0 ? void 0 : _a.length) || 9999999999;
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
export async function selectAsync(dbName, tableName, searchPayload) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableExists = await fileExistsAsync(tableFile);
    if (tableExists) {
        try {
            const result = [];
            const rawData = fs.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const objSize = Object.keys(firstEntry).length;
                const searchPayloadSize = Object.keys(searchPayload).length;
                tableData[tableName].forEach((entry) => {
                    var _a;
                    const diffAmount = ((_a = getObjectDiff(entry, searchPayload)) === null || _a === void 0 ? void 0 : _a.length) || 9999999999;
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
