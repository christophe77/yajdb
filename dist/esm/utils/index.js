import fs from "fs";
import path from "path";
import { isEqual } from "lodash";
export function getObjectDiff(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        }
        else if (isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));
    return diff;
}
export function searchEntries(tableName, tableData, searchPayload) {
    const result = [];
    const firstEntry = tableData[tableName][0];
    const objSize = Object.keys(firstEntry).length;
    const searchPayloadSize = Object.keys(searchPayload).length;
    tableData[tableName].forEach((entry) => {
        var _a;
        const diffAmount = ((_a = getObjectDiff(entry, searchPayload)) === null || _a === void 0 ? void 0 : _a.length) || -1;
        if (diffAmount === objSize - searchPayloadSize) {
            result.push(entry);
        }
    });
    return result;
}
export function updateTableDatas(dataToUpdate, entries, replacePayload) {
    let updatedTableData = JSON.stringify(Object.assign({}, dataToUpdate));
    entries.forEach((entry) => {
        const newEntry = Object.assign({}, entry);
        Object.keys(replacePayload).forEach((key) => {
            newEntry[key] = replacePayload[key];
        });
        updatedTableData = updatedTableData.replace(JSON.stringify(entry), JSON.stringify(newEntry));
    });
    return updatedTableData;
}
export const fileExistsAsync = async (filePath) => !!(await fs.promises.stat(filePath).catch((_) => false));
export const fullJsonPath = (args) => `${path.join(dbRootPath, args.join("\\"))}.json`;
