import { create, createAsync } from "./create";
import { drop, dropAsync } from "./drop";
import { insert, insertAsync } from "./insert";
import { select, selectAsync } from "./select";
import { update, updateAsync } from "./update";
const table = {
    create,
    drop,
    createAsync,
    dropAsync,
    insert,
    insertAsync,
    select,
    selectAsync,
    update,
    updateAsync,
};
export default table;
