import { StringMap } from "../types/operations";
export declare function getObjectDiff(obj1: StringMap, obj2: StringMap): string[];
export declare function searchEntries(tableName: string, tableData: any, searchPayload: StringMap): StringMap[];
export declare function updateTableDatas(dataToUpdate: any, entries: StringMap[], replacePayload: StringMap): string;
export declare const fileExistsAsync: (filePath: string) => Promise<boolean>;
export declare const fullJsonPath: (args: string[]) => string;
