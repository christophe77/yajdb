import fs from "fs";
import { fileExistsAsync, fullJsonPath } from "../../utils";
export function create(dbName, tableName, structure) {
    const tableFile = fullJsonPath([dbName, tableName]);
    const tableStructureFile = fullJsonPath([dbName, `${tableName}-col`]);
    if (fs.existsSync(tableFile)) {
        return {
            success: false,
            message: "table already exists",
        };
    }
    else {
        try {
            const initialValue = {
                [tableName]: [],
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
    const tableFile = fullJsonPath([dbName, tableName]);
    const tableStructureFile = fullJsonPath([dbName, `${tableName}-col`]);
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
                [tableName]: [],
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
