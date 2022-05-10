import { CommonOperationResponse, StringMap } from "./types/operations";

export interface YajDb {
  database: {
    create: (dbName: string) => CommonOperationResponse;
    createAsync: (dbName: string) => Promise<CommonOperationResponse>;
    drop: (dbName: string) => CommonOperationResponse;
    dropAsync: (dbName: string) => Promise<CommonOperationResponse>;
  };
  table: {
    create: (dbName: string, tableName: string) => CommonOperationResponse;
    createAsync: (
      dbName: string,
      tableName: string
    ) => Promise<CommonOperationResponse>;
    drop: (dbName: string, tableName: string) => CommonOperationResponse;
    dropAsync: (
      dbName: string,
      tableName: string
    ) => Promise<CommonOperationResponse>;
    insert: (
      dbName: string,
      tableName: string,
      values: StringMap[]
    ) => CommonOperationResponse;
    insertAsync: (
      dbName: string,
      tableName: string,
      values: StringMap[]
    ) => Promise<CommonOperationResponse>;
    select: (
      dbName: string,
      tableName: string,
      searchPayload: StringMap
    ) => CommonOperationResponse;
    selectAsync: (
      dbName: string,
      tableName: string,
      searchPayload: StringMap
    ) => Promise<CommonOperationResponse>;
  };
}
