import fs from "fs";
import path from "path";
import { CommonOperationResponse } from "../../types/operations";

const fileExists = async (filePath: string) =>
  !!(await fs.promises.stat(filePath).catch((_) => false));

const dbFullPath = (dbName: string): string => path.join(dbRootPath, dbName);


export function drop(dbName: string): CommonOperationResponse {
  if (fs.existsSync(dbFullPath(dbName))) {
    try {
      fs.unlinkSync(dbFullPath(dbName));
      return {
        success: true,
        message: "db deleted",
      };
    } catch (err) {
      return {
        success: false,
        message: `error deleting db : ${err}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error db doesn't exist : ${dbFullPath(dbName)}`,
    };
  }
}

export async function dropAsync(dbName: string): Promise<CommonOperationResponse> {
  const dbExists = await fileExists(dbFullPath(dbName));
  if (dbExists) {
    try {
      await fs.promises.unlink(dbFullPath(dbName));
      return {
        success: true,
        message: "db deleted",
      };
    } catch (err) {
      return {
        success: false,
        message: `error deleting db : ${err}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error db doesn't exist : ${dbFullPath(dbName)}`,
    };
  }
}