"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const init_1 = __importDefault(require("./init"));
const database_1 = __importDefault(require("./operations/database"));
const table_1 = __importDefault(require("./operations/table"));
globalThis.dbRootPath = path_1.default.join(process.cwd(), "yajdb");
(0, init_1.default)();
const yajdb = {
    database: database_1.default,
    table: table_1.default
};
exports.default = yajdb;
