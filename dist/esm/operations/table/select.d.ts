import { CommonOperationResponse, StringMap } from "../../types/operations";
export declare function select(dbName: string, tableName: string, searchPayload: StringMap): CommonOperationResponse;
export declare function selectAsync(dbName: string, tableName: string, searchPayload: StringMap): Promise<CommonOperationResponse>;
