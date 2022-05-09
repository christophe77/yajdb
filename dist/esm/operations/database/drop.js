import fs from "fs";
import path from "path";
const fileExists = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const dbFullPath = (dbName) => path.join(dbRootPath, dbName);
export function drop(dbName) {
    if (fs.existsSync(dbFullPath(dbName))) {
        try {
            fs.unlinkSync(dbFullPath(dbName));
            return {
                success: true,
                message: "db deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting db : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error db doesn't exist : ${dbFullPath(dbName)}`,
        };
    }
}
export async function dropAsync(dbName) {
    const dbExists = await fileExists(dbFullPath(dbName));
    if (dbExists) {
        try {
            await fs.promises.unlink(dbFullPath(dbName));
            return {
                success: true,
                message: "db deleted",
            };
        }
        catch (err) {
            return {
                success: false,
                message: `error deleting db : ${err}`,
            };
        }
    }
    else {
        return {
            success: false,
            message: `error db doesn't exist : ${dbFullPath(dbName)}`,
        };
    }
}
