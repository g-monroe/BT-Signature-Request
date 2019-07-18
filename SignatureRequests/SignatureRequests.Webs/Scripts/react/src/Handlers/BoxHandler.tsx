import { APIHandler } from "./apiHandler";
import BoxRequest from "../Entities/BoxRequest";
import BoxEntity from "../Entities/BoxEntity";

export interface IBoxHandler {
    createBox(entity: BoxRequest) : Promise<BoxEntity>;
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
}