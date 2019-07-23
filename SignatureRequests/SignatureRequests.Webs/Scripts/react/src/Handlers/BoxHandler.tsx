import { APIHandler } from "./apiHandler";
import BoxRequest from "../Entities/BoxRequest";
import BoxEntity from "../Entities/BoxEntity";
import BoxResponseList from "../Entities/BoxResponseList";
import ModelBoxList from '../Entities/ToComplete/ModelBoxList';
export interface IBoxHandler {
    createBox(entity: BoxRequest) : Promise<BoxEntity>;
    getModelBoxes(id: number) : Promise<ModelBoxList>;
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

    async getModelBoxes(id: number) : Promise<ModelBoxList> {
        return await APIHandler(`/api/Box/GetModelBoxesbyFormId/${id}`, {
        headers: {"Content-Type" : "application/json"},
        method: "GET",
        responseType: ModelBoxList
        });   
    }
}