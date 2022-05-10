declare const yajdb: {
    database: {
        create: typeof import("./operations/database/create").create;
        drop: typeof import("./operations/database/drop").drop;
        createAsync: typeof import("./operations/database/create").createAsync;
        dropAsync: typeof import("./operations/database/drop").dropAsync;
    };
    table: {
        create: typeof import("./operations/table/create").create;
        drop: typeof import("./operations/table/drop").drop;
        createAsync: typeof import("./operations/table/create").createAsync;
        dropAsync: typeof import("./operations/table/drop").dropAsync;
        insert: typeof import("./operations/table/insert").insert;
        insertAsync: typeof import("./operations/table/insert").insertAsync;
        select: typeof import("./operations/table/select").select;
        selectAsync: typeof import("./operations/table/select").selectAsync;
        update: typeof import("./operations/table/update").update;
        updateAsync: typeof import("./operations/table/update").updateAsync;
    };
};
export default yajdb;
