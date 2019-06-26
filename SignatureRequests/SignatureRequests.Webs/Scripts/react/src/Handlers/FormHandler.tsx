import { APIHandler } from "./apiHandler";
import FormResponseList from "../Entities/FormResponseList";

export interface IFormHandler {
    getAllByUser(id: number): Promise<FormResponseList>;
    uploadForm(files: FileList): Promise<String>;
}

export class FormHandler implements IFormHandler {
    async getAllByUser(id: number) : Promise<FormResponseList> {
        const collection = await APIHandler(`/api/Form/GetFormsByUserId/${id}`, {
            method: "GET",
            responseType: FormResponseList
        });
        return collection;
    }
    async uploadForm(files: FileList) : Promise<String> {
        const collection = await APIHandler(`/api/Form/Upload`, {
            method: "POST",
            data: files,
            responseType: String
        });
        return collection;
    }    
}
