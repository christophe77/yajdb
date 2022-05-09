import fs from "fs";
import path from "path";
const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
const tableFullPath = (dbName, tableName) => `${path.join(dbRootPath, dbName, tableName)}.json`;
export function insert(dbName, tableName, values) {
    const tableFile = tableFullPath(dbName, tableName);
    if (fs.existsSync(tableFile)) {
        try {
            const rawData = fs.readFileSync(tableFile);
            const currentTableData = JSON.parse(rawData.toString());
            const updatedTableData = Object.assign({}, currentTableData);
            values.forEach(value => updatedTableData[tableName].push(value));
            fs.writeFileSync(tableFile, JSON.stringify(updatedTableData));
            return {
                success: true,
                message: `data inserted ${JSON.stringify(values)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
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
export async function insertAsync(dbName, tableName, values) {
    const tableFile = tableFullPath(dbName, tableName);
    const tableExists = await fileExistsAsync(tableFile);
    if (tableExists) {
        try {
            const rawData = await fs.promises.readFile(tableFile);
            const currentTableData = JSON.parse(rawData.toString());
            const updatedTableData = Object.assign({}, currentTableData);
            values.forEach(value => updatedTableData[tableName].push(value));
            await fs.promises.writeFile(tableFile, JSON.stringify(updatedTableData));
            return {
                success: true,
                message: `data inserted ${JSON.stringify(values)}`,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `error creating table : ${error}`,
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
