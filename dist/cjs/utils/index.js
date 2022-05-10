"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullJsonPath = exports.fileExistsAsync = exports.updateTableDatas = exports.searchEntries = exports.getObjectDiff = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
function getObjectDiff(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        }
        else if ((0, lodash_1.isEqual)(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));
    return diff;
}
exports.getObjectDiff = getObjectDiff;
function searchEntries(tableName, tableData, searchPayload) {
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
exports.searchEntries = searchEntries;
function updateTableDatas(dataToUpdate, entries, replacePayload) {
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
exports.updateTableDatas = updateTableDatas;
const fileExistsAsync = async (filePath) => !!(await fs_1.default.promises.stat(filePath).catch((_) => false));
exports.fileExistsAsync = fileExistsAsync;
const fullJsonPath = (args) => `${path_1.default.join(dbRootPath, args.join("\\"))}.json`;
exports.fullJsonPath = fullJsonPath;
