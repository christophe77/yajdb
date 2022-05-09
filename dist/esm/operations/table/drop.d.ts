import { CommonOperationResponse } from "../../types/operations";
export declare function drop(dbName: string, tableName: string): CommonOperationResponse;
export declare function dropAsync(dbName: string, tableName: string): Promise<CommonOperationResponse>;
