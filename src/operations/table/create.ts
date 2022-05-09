import fs from "fs";
import path from "path";
import {
  CommonOperationResponse,
  TableStructure,
} from "../../types/operations";

const fileExistsAsync = async (filePath: string) =>
  !!(await fs.promises.stat(filePath).catch((_) => false));

const tableFullPath = (dbName: string, tableName: string): string =>
  `${path.join(dbRootPath, dbName, tableName)}.json`;

export function create(
  dbName: string,
  tableName: string,
  structure: TableStructure[]
): CommonOperationResponse {
  const tableFile = tableFullPath(dbName, tableName);
  const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
  if (fs.existsSync(tableFile)) {
    return {
      success: false,
      message: "table already exists",
    };
  } else {
    try {
      const initialValue = {
        [tableName] : []
      }
      fs.writeFileSync(
        tableStructureFile,
        `{ "structure" : ${JSON.stringify(structure)}}`
      );
      fs.writeFileSync(tableFile, JSON.stringify(initialValue));
      return {
        success: true,
        message: `table created ${tableFile}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating table : ${error}`,
      };
    }
  }
}
export async function createAsync(
  dbName: string,
  tableName: string,
  structure: TableStructure[]
): Promise<CommonOperationResponse> {
  const tableFile = tableFullPath(dbName, tableName);
  const tableStructureFile = tableFullPath(dbName, `${tableName}-col`);
  const dbExists = await fileExistsAsync(tableFile);
  if (dbExists) {
    return {
      success: false,
      message: "table already exists",
    };
  } else {
    try {
      const initialValue = {
        [tableName] : []
      }
      await fs.promises.writeFile(
        tableStructureFile,
        `{ "structure" : ${JSON.stringify(structure)}}`
      );
      await fs.promises.writeFile(tableFile, JSON.stringify(initialValue));
      return {
        success: true,
        message: `table created ${tableFile}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating table : ${error}`,
      };
    }
  }
}
