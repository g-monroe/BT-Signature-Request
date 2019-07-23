import { APIHandler } from "./apiHandler";
import BoxRequest from "../Entities/BoxRequest";
import BoxEntity from "../Entities/BoxEntity";
import BoxResponseList from "../Entities/BoxResponseList";

export interface IBoxHandler {
    createBox(entity: BoxRequest) : Promise<BoxEntity>;
    getModalBox(id: number) : Promise<BoxResponseList>;
}

export class BoxHandler implements IBoxHandler {
    async createBox(entity: BoxRequest) : Promise<BoxEntity> {
        
        return await APIHandler(`/api/Box/AddBox`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: BoxEntity
        });
    }
    async getModalBox(id: number) : Promise<BoxResponseList> {
        return await APIHandler(`/api/Box/GetBoxesbyFormId//${id}`, {
            headers: {"Content-Type" : "application/json"},
            method: "GET",
            responseType: BoxResponseList
        });
        
    }
}