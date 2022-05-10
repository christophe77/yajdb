import fs from "fs";
import { fileExistsAsync, fullJsonPath } from "../../utils";
export function drop(dbName, tableName) {
    const tableFile = fullJsonPath([dbName, tableName]);
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
    const tableFile = fullJsonPath([dbName, tableName]);
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
