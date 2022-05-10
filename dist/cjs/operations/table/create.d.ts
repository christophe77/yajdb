import { CommonOperationResponse, TableStructure } from "../../types/operations";
export declare function create(dbName: string, tableName: string, structure: TableStructure[]): CommonOperationResponse;
export declare function createAsync(dbName: string, tableName: string, structure: TableStructure[]): Promise<CommonOperationResponse>;
