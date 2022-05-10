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

#### create database

    // sync
    const createDbResponse = database.create(dbName);
    console.log(createDbResponse);

    // async
    async function createMyDb(myDbName){
        const createDbAsyncResponse = await database.createAsync(myDbName);
        console.log(createDbAsyncResponse);
    }
    createMyDb(dbName);

#### delete database

    // sync
    const deleteDbResponse = database.drop(dbName);
    console.log(deleteDbResponse);

    // async
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

#### create table

    // sync
    const createTableResponse = table.create(dbName, tableName, tableStructure);
    console.log(createTableResponse);

    // async
    async function createMyTable(myDbName, myTableName, myTableStructure){
        const createTableAsyncResponse = await table.createAsync(myDbName, myTableName, myTableStructure);
        console.log(createTableAsyncResponse);
    }
    createMyTable(dbName, tableName, tableStructure);

#### delete table

    // sync
    const deleteTableResponse = table.drop(dbName, tableName);
    console.log(deleteTableResponse);

    // async
    async function deleteMyTable(myDbName, myTableName){
        const deleteTableAsyncResponse = await table.dropAsync(myDbName, myTableName, tableStructure);
        console.log(deleteTableAsyncResponse)
    }
    deleteMyTable(dbName, tableName);

#### insert into table

    // sync
    const insertResponse = table.insert(dbName, tableName, values);
    console.log(insertResponse);

    // async
    async function insertIntoTable(myDbName, myTableName, myValues){
        const insertAsyncResponse = await table.insertAsync(myDbName, myTableName, myValues);
        console.log(insertAsyncResponse)
    }
    insertIntoTable(dbName, tableName, values);

#### select from table

    // sync
    const searchRowPayload = {"attId":"1"};
    const selectResponse = table.select(dbName, tableName, searchRowPayload);
    console.log(selectResponse);

    // async
    async function selectFromTable(myDbName, myTableName, myPayload){
        const selectAsyncResponse = await table.selectAsync(myDbName, myTableName, myPayload);
        console.log(selectAsyncResponse)
    }
    selectFromTable(dbName, tableName, searchRowPayload);

#### update row

    // sync
    const searchPayload = {"attId":"1"};
    const updatePayload = {"color":"white"};
    const updateResponse = table.update(dbName, tableName, searchPayload, updatePayload);
    console.log(updateResponse);

    // async
    async function updateRow(myDbName, myTableName, mySearchPayload, myUpdatePayload){
        const updateAsyncResponse = await table.updateAsync(myDbName, myTableName, mySearchPayload, myUpdatePayload);
        console.log(updateAsyncResponse)
    }
    updateRow(dbName, tableName, searchPayload, updatePayload);

### IN PROGRESS

- select all
- delete row
