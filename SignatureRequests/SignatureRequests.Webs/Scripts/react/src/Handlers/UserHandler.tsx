import { APIHandler } from "./apiHandler";
import UserResponseList from "../Entities/UserResponseList";
import UserEntity from "../Entities/UserEntity";
import UserRequest from "../Entities/UserRequest";

export interface IUserHandler {
    getAll(): Promise<UserResponseList>;
    createUser(newUser:UserRequest) : Promise<UserEntity>;
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

    async createUser(newUser:UserRequest) : Promise<UserEntity> {
        const user = await APIHandler(`api/User/AddUser`, {
            method: "POST",
            responseType: UserEntity,
            data:newUser
        });
        return user;
    }
}