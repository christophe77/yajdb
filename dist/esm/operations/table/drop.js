import fs from "fs";
import path from "path";
const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path.join(dbRootPath, dbName, tableName)}.json`;
export function drop(dbName, tableName) {
    const tableFile = tableFullPath(dbName, tableName);
    if (fs.existsSync(tableFile)) {
        try {
            fs.unlinkSync(tableFile);
            return {
                success: true,
                message: "table deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting table : ${err}`,
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
export async function dropAsync(dbName, tableName) {
    const tableFile = tableFullPath(dbName, tableName);
    const dbExists = await fileExistsAsync(tableFile);
    if (dbExists) {
        try {
            await fs.promises.unlink(tableFile);
            return {
                success: true,
                message: "table deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting table : ${err}`,
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
