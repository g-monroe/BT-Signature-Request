import { APIHandler } from "./apiHandler";
import RequestRequest from "../Entities/RequestRequest";
import RequestEntity from "../Entities/RequestEntity";

export interface IRequestHandler {
    createRequest(entity: RequestRequest) : Promise<RequestEntity>;
}

export class RequestHandler implements IRequestHandler {
    async createRequest(entity: RequestRequest) : Promise<RequestEntity> {
        return await APIHandler(`/api/Request/AddRequest`, {
            method: "POST",
            data: entity,
            responseType: RequestEntity
        });
    }
}