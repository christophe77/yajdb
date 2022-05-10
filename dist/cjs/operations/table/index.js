"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const drop_1 = require("./drop");
const insert_1 = require("./insert");
const select_1 = require("./select");
const update_1 = require("./update");
const table = {
    create: create_1.create,
    drop: drop_1.drop,
    createAsync: create_1.createAsync,
    dropAsync: drop_1.dropAsync,
    insert: insert_1.insert,
    insertAsync: insert_1.insertAsync,
    select: select_1.select,
    selectAsync: select_1.selectAsync,
    update: update_1.update,
    updateAsync: update_1.updateAsync,
};
exports.default = table;
