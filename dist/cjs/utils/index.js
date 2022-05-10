"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectDiff = void 0;
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
