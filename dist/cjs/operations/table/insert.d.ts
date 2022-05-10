import { CommonOperationResponse, StringMap } from "../../types/operations";
export declare function insert(dbName: string, tableName: string, values: StringMap[]): CommonOperationResponse;
export declare function insertAsync(dbName: string, tableName: string, values: StringMap[]): Promise<CommonOperationResponse>;
