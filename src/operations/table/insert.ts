import fs from "fs";
import { CommonOperationResponse, StringMap} from "../../types/operations";
import { fileExistsAsync, fullJsonPath } from "../../utils";

export function insert(
  dbName: string,
  tableName: string,
  values: StringMap[]
): CommonOperationResponse {
  const tableFile = fullJsonPath([dbName, tableName]);
  if (fs.existsSync(tableFile)) {
    try {
      const rawData = fs.readFileSync(tableFile);
      const currentTableData = JSON.parse(rawData.toString());
      const updatedTableData = { ...currentTableData };
      values.forEach(value => updatedTableData[tableName].push(value))
      fs.writeFileSync(tableFile, JSON.stringify(updatedTableData));
      return {
        success: true,
        message: `data inserted ${JSON.stringify(values)}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating table : ${error}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}

export async function insertAsync(
  dbName: string,
  tableName: string,
  values: StringMap[]
): Promise<CommonOperationResponse> {
  const tableFile = fullJsonPath([dbName, tableName]);
  const tableExists = await fileExistsAsync(tableFile);
  if (tableExists) {
    try {
      const rawData = await fs.promises.readFile(tableFile);
      const currentTableData = JSON.parse(rawData.toString());
      const updatedTableData = { ...currentTableData };
      values.forEach(value => updatedTableData[tableName].push(value))
      await fs.promises.writeFile(tableFile, JSON.stringify(updatedTableData));
      return {
        success: true,
        message: `data inserted ${JSON.stringify(values)}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `error creating table : ${error}`,
      };
    }
  } else {
    return {
      success: false,
      message: `error table doesn't exist : ${tableFile}`,
    };
  }
}
