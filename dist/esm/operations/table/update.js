import fs from "fs";
import { searchEntries, updateTableDatas, fileExistsAsync, fullJsonPath } from "../../utils";
export function update(dbName, tableName, searchPayload, replacePayload) {
    const tableFile = fullJsonPath([dbName, tableName]);
    if (fs.existsSync(tableFile)) {
        try {
            const rawData = fs.readFileSync(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const entries = searchEntries(tableName, tableData, searchPayload);
                if (entries.length > 0) {
                    const updatedTableData = updateTableDatas(tableData, entries, replacePayload);
                    fs.writeFileSync(tableFile, updatedTableData);
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
export async function updateAsync(dbName, tableName, searchPayload, replacePayload) {
    const tableFile = fullJsonPath([dbName, tableName]);
    const fileExists = await fileExistsAsync(tableFile);
    if (fileExists) {
        try {
            const rawData = await fs.promises.readFile(tableFile);
            const tableData = JSON.parse(rawData.toString());
            const firstEntry = tableData[tableName][0];
            if (firstEntry) {
                const entries = searchEntries(tableName, tableData, searchPayload);
                if (entries.length > 0) {
                    const updatedTableData = updateTableDatas(tableData, entries, replacePayload);
                    await fs.promises.writeFile(tableFile, updatedTableData);
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
