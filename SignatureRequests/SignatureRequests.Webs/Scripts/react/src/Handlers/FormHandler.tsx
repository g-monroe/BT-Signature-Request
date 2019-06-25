import { APIHandler } from "./apiHandler";
import FormResponseList from "../Entities/FormResponseList";

export interface IFormHandler {
    getAllByUser(id: number): Promise<FormResponseList>;
}

export class FormHandler implements IFormHandler {
    async getAllByUser(id: number) : Promise<FormResponseList> {
        const collection = await APIHandler(`/api/Form/GetFormsByUserId/${id}`, {
            method: "GET",
            responseType: FormResponseList
        });
        return collection;
    }
}