import path from "path";
import init from "./init";
import database from "./operations/database";
import table from "./operations/table";
globalThis.dbRootPath = path.join(path.resolve(__dirname), "storage");
init();
const yajdb = {
    database,
    table
};
export default yajdb;
