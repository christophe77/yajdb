const yajdb = require("../dist/cjs").default;

const { database, table } = yajdb;

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

database.create(dbName);
table.create(dbName, tableName, tableStructure);
table.insert(dbName, tableName, values);

const selectPayload = { attId: "1" };
const selectResponse = table.select(dbName, tableName, selectPayload);
const myCars = selectResponse.message;
console.log(myCars);

const updatePayload = { color: "white" };
const updateResponse = table.update(
  dbName,
  tableName,
  selectPayload,
  updatePayload
);
console.log(updateResponse);
