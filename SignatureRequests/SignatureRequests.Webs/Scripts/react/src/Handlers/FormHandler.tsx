import { APIHandler } from "./apiHandler";
import FormResponseList from "../Entities/FormResponseList";
import FormRequest from "../Entities/FormRequest";
import FormEntity from "../Entities/FormEntity";

export interface IFormHandler {
    getAllByUser(id: number): Promise<FormResponseList>;
    createForm(entity: FormRequest) : Promise<FormEntity>;
    uploadForm(file: FormData) : Promise<String>;
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

    async createForm(entity: FormRequest) : Promise<FormEntity> {
        return await APIHandler(`/api/Form/AddForm`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: FormEntity
        });
    }
    
    async uploadForm(file: FormData) : Promise<String> {
        return await new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open("POST", "http://localhost:64445/api/Form/Upload");
          req.send(file);
          resolve(req.response);
        });
      }

    async getFormById(id: number) : Promise<FormEntity> {
        console.log("At least this works");
        const collection = await APIHandler(`/api/Form/GetFormById/${id}`, {
            headers: {"Content-Type": "application/json"},
            method: "GET",
            responseType: FormResponseList
        });
        console.log(collection);
        return collection.collection[0];
    }
}
