import { APIHandler } from "./apiHandler";
import UserResponseList from "../Entities/UserResponseList";

export interface IUserHandler {
    getAll(): Promise<UserResponseList>;
}

export class UserHandler implements IUserHandler {
    async getAll() : Promise<UserResponseList> {
        const collection = await APIHandler(`/api/User/GetUsers`, {
            headers: {"Content-Type" : "application/json"},
            method: "GET",
            responseType: UserResponseList
        });
        return collection;
    }
}