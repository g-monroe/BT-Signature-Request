import { APIHandler } from "./apiHandler";
import RequestRequest from "../Entities/RequestRequest";
import RequestEntity from "../Entities/RequestEntity";
import RequestToCompleteEntity from '../Entities/ToComplete/RequestToCompleteEntity';

export interface IRequestHandler {
    createRequest(entity: RequestRequest) : Promise<RequestEntity>;
}

export class RequestHandler implements IRequestHandler {
    
    async createRequest(entity: RequestRequest) : Promise<RequestEntity> {
        return await APIHandler(`/api/Request/AddRequest`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: RequestEntity
        });
    }

    async getRequestByRequestId(id: number) : Promise<RequestToCompleteEntity> {
        return await APIHandler(`api/Request/GetRequestByRequestId/${id}`,{
            headers: {"Content-Type" : "application/json"},
            method:'GET',
            responseType:RequestToCompleteEntity
        });
    }
}