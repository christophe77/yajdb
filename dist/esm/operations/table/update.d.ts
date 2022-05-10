import { CommonOperationResponse, StringMap } from "../../types/operations";
export declare function update(dbName: string, tableName: string, searchPayload: StringMap, replacePayload: StringMap): CommonOperationResponse;
export declare function updateAsync(dbName: string, tableName: string, searchPayload: StringMap, replacePayload: StringMap): Promise<CommonOperationResponse>;
