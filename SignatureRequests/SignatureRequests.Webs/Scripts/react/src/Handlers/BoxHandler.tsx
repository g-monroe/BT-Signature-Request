import { APIHandler } from "./apiHandler";
import BoxRequest from "../Entities/BoxRequest";
import BoxEntity from "../Entities/BoxEntity";
import ModelBoxList from '../Entities/ToComplete/ModelBoxList';
import SignedBoxRequest from '../Entities/SignedBoxRequest';
import NumberResponse from "../Entities/ToComplete/NumberResponse";

export interface IBoxHandler {
    createBox(entity: BoxRequest) : Promise<BoxEntity>;
    getModelBoxes(id: number) : Promise<ModelBoxList>;
    addSignatureToBox(updatedBox: SignedBoxRequest) : Promise<NumberResponse>;
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

    async addSignatureToBox(updatedBox: SignedBoxRequest) : Promise<NumberResponse> {
        return await APIHandler(`/api/Box/AddDataToBox`, {
        headers: {"Content-Type" : "application/json"},
        method: "PUT",
        data:updatedBox,
        responseType: NumberResponse
        });   
    }
}