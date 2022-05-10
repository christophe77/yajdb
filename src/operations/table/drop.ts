import fs from "fs";
import path from "path";
import { CommonOperationResponse } from "../../types/operations";
import { fileExistsAsync, fullJsonPath } from "../../utils";

export function drop(
  dbName: string,
  tableName: string
): CommonOperationResponse {
  const tableFile = fullJsonPath([dbName, tableName]);
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
  const tableFile = fullJsonPath([dbName, tableName]);
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
