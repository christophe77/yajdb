"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function init() {
    if (!fs_1.default.existsSync(dbRootPath)) {
        fs_1.default.mkdirSync(dbRootPath, { recursive: true });
    }
}
exports.default = init;
