import { create, createAsync } from "./create";
import { drop, dropAsync } from "./drop";
declare const database: {
    create: typeof create;
    drop: typeof drop;
    createAsync: typeof createAsync;
    dropAsync: typeof dropAsync;
};
export default database;
