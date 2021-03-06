import fs from "fs";
import { CommonOperationResponse, StringMap } from "../../types/operations";
import { searchEntries, fileExistsAsync, fullJsonPath } from "../../utils";

export function select(
  dbName: string,
  tableName: string,
  searchPayload: StringMap
): CommonOperationResponse {
  const tableFile = fullJsonPath([dbName, tableName]);
  if (fs.existsSync(tableFile)) {
    try {
      const rawData = fs.readFileSync(tableFile);
      const tableData = JSON.parse(rawData.toString());
      const firstEntry = tableData[tableName][0];
      if (firstEntry) {
        const result = searchEntries(tableName, tableData, searchPayload);
        return {
          success: true,
          message: JSON.stringify(result),
        };
      }
      return {
        success: false,
        message: `table is empty`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error selecting payload`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}

export async function selectAsync(
  dbName: string,
  tableName: string,
  searchPayload: StringMap
): Promise<CommonOperationResponse> {
  const tableFile = fullJsonPath([dbName, tableName]);
  const tableExists = await fileExistsAsync(tableFile);
  if (tableExists) {
    try {
      const rawData = fs.readFileSync(tableFile);
      const tableData = JSON.parse(rawData.toString());
      const firstEntry = tableData[tableName][0];
      if (firstEntry) {
        const result = searchEntries(tableName, tableData, searchPayload);
        return {
          success: true,
          message: JSON.stringify(result),
        };
      }
      return {
        success: false,
        message: `table is empty`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error selecting payload`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}
