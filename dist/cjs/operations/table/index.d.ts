import { create, createAsync } from "./create";
import { drop, dropAsync } from "./drop";
import { insert, insertAsync } from "./insert";
import { select, selectAsync } from "./select";
declare const table: {
    create: typeof create;
    drop: typeof drop;
    createAsync: typeof createAsync;
    dropAsync: typeof dropAsync;
    insert: typeof insert;
    insertAsync: typeof insertAsync;
    select: typeof select;
    selectAsync: typeof selectAsync;
};
export default table;
