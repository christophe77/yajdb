import { CommonOperationResponse } from "../../types/operations";
export declare function drop(dbName: string): CommonOperationResponse;
export declare function dropAsync(dbName: string): Promise<CommonOperationResponse>;
