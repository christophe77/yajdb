import fs from "fs";
import path from "path";
import { isEqual } from "lodash";
import { StringMap } from "../types/operations";

export function getObjectDiff(obj1: StringMap, obj2: StringMap) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));
  return diff;
}

export function searchEntries(
  tableName: string,
  tableData: any,
  searchPayload: StringMap
): StringMap[] {
  const result: StringMap[] = [];
  const firstEntry = tableData[tableName][0];
  const objSize = Object.keys(firstEntry).length;
  const searchPayloadSize = Object.keys(searchPayload).length;
  tableData[tableName].forEach((entry: StringMap) => {
    const diffAmount = getObjectDiff(entry, searchPayload)?.length || -1;
    if (diffAmount === objSize - searchPayloadSize) {
      result.push(entry);
    }
  });
  return result;
}

export function updateTableDatas(
  dataToUpdate: any,
  entries: StringMap[],
  replacePayload: StringMap
) {
  let updatedTableData = JSON.stringify({ ...dataToUpdate });
  entries.forEach((entry) => {
    const newEntry = { ...entry };
    Object.keys(replacePayload).forEach((key) => {
      newEntry[key] = replacePayload[key];
    });
    updatedTableData = updatedTableData.replace(
      JSON.stringify(entry),
      JSON.stringify(newEntry)
    );
  });
  return updatedTableData;
}

export const fileExistsAsync = async (filePath: string) =>
  !!(await fs.promises.stat(filePath).catch((_) => false));

export const fullJsonPath = (args: string[]): string =>
  `${path.join(dbRootPath, args.join("\\"))}.json`;
