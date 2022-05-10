"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const drop_1 = require("./drop");
const database = {
    create: create_1.create,
    drop: drop_1.drop,
    createAsync: create_1.createAsync,
    dropAsync: drop_1.dropAsync,
};
exports.default = database;
