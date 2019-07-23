import { APIHandler } from "./apiHandler";
import FormResponseList from "../Entities/FormResponseList";
import FormRequest from "../Entities/FormRequest";
import FormEntity from "../Entities/FormEntity";

export interface IFormHandler {
    getAllByUser(id: number): Promise<FormResponseList>;
    getAllRequested(id: number): Promise<FormResponseList>;
    createForm(entity: FormRequest) : Promise<FormEntity>;
    uploadForm(file: FormData) : XMLHttpRequest;
    getFormById(id: number) : Promise<FormEntity>;
}

export class FormHandler implements IFormHandler {
    async getAllByUser(id: number) : Promise<FormResponseList> {
        const collection = await APIHandler(`/api/Form/GetFormsByUserId/${id}`, {
            headers: {"Content-Type" : "application/json"},
            method: "GET",
            responseType: FormResponseList
        });
        return collection;
    }
    async getAllRequested(id: number) : Promise<FormResponseList> {
        const collection = await APIHandler(`/api/Form/GetFormsRequested/${id}`, {
            headers: {"Content-Type" : "application/json"},
            method: "GET",
            responseType: FormResponseList
        });
        return collection;
    }
    async createForm(entity: FormRequest) : Promise<FormEntity> {
        return await APIHandler(`/api/Form/AddForm`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: FormEntity
        });
    }
    
    uploadForm(file: FormData) : XMLHttpRequest {
        const req = new XMLHttpRequest();
        (req.open("POST", "http://localhost:64445/api/Form/Upload"));
        (req.send(file));
        return req;
      }

    async getFormById(id: number) : Promise<FormEntity> {
        const collection = await APIHandler(`/api/Form/GetFormById/${id}`, {
            headers: {"Content-Type": "application/json"},
            method: "GET",
            responseType: FormEntity
        });
        return collection;
    }
}
