import fs from "fs";
import path from "path";
import { CommonOperationResponse } from "../../types/operations";

const fileExistsAsync = async (filePath: string) =>
  !!(await fs.promises.stat(filePath).catch((_) => false));

const tableFullPath = (dbName: string, tableName: string): string =>
  `${path.join(dbRootPath, dbName, tableName)}.json`;

export function drop(
  dbName: string,
  tableName: string
): CommonOperationResponse {
  const tableFile = tableFullPath(dbName, tableName);
  if (fs.existsSync(tableFile)) {
    try {
      fs.unlinkSync(tableFile);
      return {
        success: true,
        message: "table deleted",
      };
    } catch (err) {
      return {
        success: false,
        message: `error deleting table : ${err}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}
export async function dropAsync(
  dbName: string,
  tableName: string
): Promise<CommonOperationResponse> {
  const tableFile = tableFullPath(dbName, tableName);
  const dbExists = await fileExistsAsync(tableFile);
  if (dbExists) {
    try {
      await fs.promises.unlink(tableFile);
      return {
        success: true,
        message: "table deleted",
      };
    } catch (err) {
      return {
        success: false,
        message: `error deleting table : ${err}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}
