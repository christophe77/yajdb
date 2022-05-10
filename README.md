# YAJDB => Yet Another Json Database

## Installation

    npm i yajdb
    // or
    yarn add yajdb

## Error handling

Error handling is not done using "throw", responses are returned after each action in an object :

    {
        success : boolean,
        message : string
    }

## Import

    const yajdb = require("yajdb").default;
    // or
    import yajdb from "yajdb";

### DB API

    const { database } = yajdb;
    const dbName = "cars";

    // sync
    // create database
    const createDbResponse = database.create(dbName);
    console.log(createDbResponse);

    // delete database
    const deleteDbResponse = database.drop(dbName);
    console.log(deleteDbResponse);

    // async
    // create database
    async function createMyDb(myDbName){
        const createDbAsyncResponse = await database.createAsync(myDbName);
        console.log(createDbAsyncResponse);
    }
    createMyDb(dbName);

    // delete database
    async function deleteMyDb(myDbName){
        const deleteDbAsyncResponse = await database.dropAsync(myDbName);
        console.log(deleteDbAsyncResponse);
    }
    deleteMyDb(dbName);

### TABLE API

    const { table } = yajdb;

    const dbName = "cars";
    const tableName = "attributes";
    const tableStructure = [
        { name: "attId", type: "string" },
        { name: "color", type: "string" },
        { name: "brand", type: "string" },
    ];
    const values = [
        { attId: "1", color: "red", brand: "audi" },
        { attId: "2", color: "blue", brand: "mercedes" },
    ];

    // create table
    // sync
    const createTableResponse = table.create(dbName, tableName, tableStructure);
    console.log(createTableResponse);

    // async
    async function createMyTable(myDbName, myTableName, myTableStructure){
        const createTableAsyncResponse = await table.createAsync(myDbName, myTableName, myTableStructure);
        console.log(createTableAsyncResponse);
    }
    createMyTable(dbName, tableName, tableStructure);

    // delete table
    // sync
    const deleteTableResponse = table.drop(dbName, tableName);
    console.log(deleteTableResponse);

    // async
    async function deleteMyTable(myDbName, myTableName){
        const deleteTableAsyncResponse = await table.dropAsync(myDbName, myTableName, tableStructure);
        console.log(deleteTableAsyncResponse)
    }
    deleteMyTable(dbName, tableName);

    // insert into table
    // sync
    const insertResponse = table.insert(dbName, tableName, values);
    console.log(insertResponse);

    // async
    async function insertIntoTable(myDbName, myTableName, myValues){
        const insertAsyncResponse = await table.insert(myDbName, myTableName, myValues);
        console.log(insertAsyncResponse)
    }
    deleteMyTable(dbName, tableName);

    // select from table
    // sync
    const payload = {"attId":"1"};
    const selectResponse = table.select(dbName, tableName, payload);
    console.log(selectResponse);

    // async
    async function selectFromTable(myDbName, myTableName, myPayload){
        const selectAsyncResponse = await table.select(myDbName, myTableName, myPayload);
        console.log(selectAsyncResponse)
    }
    selectFromTable(dbName, tableName, payload);

### IN PROGRESS

- update row
- delete row
