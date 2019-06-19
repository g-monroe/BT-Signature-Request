import { APIHandler } from "./apiHandler";
import FormEntity from "../Entities/FormEntity";
import UserResponseList from "../Entities/UserResponseList";

export interface IUserHandler {
    getAll(): Promise<UserResponseList>;
}

export class UserHandler implements IUserHandler {
    async getAll() : Promise<UserResponseList> {
        const collection = await APIHandler(`/api/User/GetUsers`, {
            method: "GET",
            responseType: UserResponseList
        });
        return collection;
    }
}