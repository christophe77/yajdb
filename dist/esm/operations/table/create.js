import fs from "fs";
import path from "path";
const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path.join(dbRootPath, dbName, tableName)}.json`;
export function create(dbName, tableName, structure) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
    if (fs.existsSync(tableFile)) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: []
            };
            fs.writeFileSync(tableStructureFile, `{ "structure" : ${JSON.stringify(structure)}}`);
            fs.writeFileSync(tableFile, JSON.stringify(initialValue));
            return {
                success: true,
                message: `table created ${tableFile}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
            };
        }
    }
}
export async function createAsync(dbName, tableName, structure) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
    const dbExists = await fileExistsAsync(tableFile);
    if (dbExists) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: []
            };
            await fs.promises.writeFile(tableStructureFile, `{ "structure" : ${JSON.stringify(structure)}}`);
            await fs.promises.writeFile(tableFile, JSON.stringify(initialValue));
            return {
                success: true,
                message: `table created ${tableFile}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
            };
        }
    }
}
