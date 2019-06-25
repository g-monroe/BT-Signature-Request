import { APIHandler } from "./apiHandler";
import FormResponseList from "../Entities/FormResponseList";
import FormRequest from "../Entities/FormRequest";
import FormEntity from "../Entities/FormEntity";

export interface IFormHandler {
    getAllByUser(id: number): Promise<FormResponseList>;
    createForm(entity: FormRequest) : Promise<FormEntity>;
}

export class FormHandler implements IFormHandler {
    async getAllByUser(id: number) : Promise<FormResponseList> {
        const collection = await APIHandler(`/api/Form/GetFormsById/${id}`, {
            method: "GET",
            responseType: FormResponseList
        });
        return collection;
    }

    async createForm(entity: FormRequest) : Promise<FormEntity> {
        return await APIHandler(`/api/Form/AddForm`, {
            method: "POST",
            data: entity,
            responseType: FormEntity
        });
    }
}