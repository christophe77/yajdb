import path from "path";
import init from "./init";
import database from "./operations/database";
import table from "./operations/table";

(globalThis as any).dbRootPath = path.join(process.cwd(), "yajdb");

init();

const yajdb = {
  database,
  table
};
export default yajdb;
