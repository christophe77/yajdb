import fs from "fs";
import path from "path";
import { CommonOperationResponse } from "../../types/operations";

const fileExistsAsync = async (filePath: string) =>
  !!(await fs.promises.stat(filePath).catch((_) => false));

const dbFullPath = (dbName: string): string => path.join(dbRootPath, dbName);

export function create(dbName: string): CommonOperationResponse {
  if (fs.existsSync(dbFullPath(dbName))) {
    return {
      success: false,
      message: "db already exists",
    };
  } else {
    try {
      fs.mkdirSync(dbFullPath(dbName));
      return {
        success: true,
        message: `db created ${dbFullPath(dbName)}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating db : ${error}`,
      };
    }
  }
}
export async function createAsync(dbName: string): Promise<CommonOperationResponse> {
  const dbExists = await fileExistsAsync(dbFullPath(dbName));
  if (dbExists) {
    return {
      success: false,
      message: "db already exists",
    };
  } else {
    try {
      await fs.promises.mkdir(dbFullPath(dbName));
      return {
        success: true,
        message: `db created ${dbFullPath(dbName)}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating db : ${error}`,
      };
    }
  }
}