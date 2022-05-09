import fs from "fs";
import path from "path";
const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const dbFullPath = (dbName) => path.join(dbRootPath, dbName);
export function create(dbName) {
    if (fs.existsSync(dbFullPath(dbName))) {
        return {
            success: false,
            message: "db already exists",
        };
    }
    else {
        try {
            fs.mkdirSync(dbFullPath(dbName));
            return {
                success: true,
                message: `db created ${dbFullPath(dbName)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating db : ${error}`,
            };
        }
    }
}
export async function createAsync(dbName) {
    const dbExists = await fileExistsAsync(dbFullPath(dbName));
    if (dbExists) {
        return {
            success: false,
            message: "db already exists",
        };
    }
    else {
        try {
            await fs.promises.mkdir(dbFullPath(dbName));
            return {
                success: true,
                message: `db created ${dbFullPath(dbName)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating db : ${error}`,
            };
        }
    }
}
