import { APIHandler } from "./apiHandler";
import UserResponseList from "../Entities/UserResponseList";
import UserEntity from "../Entities/UserEntity";
import UserRequest from "../Entities/UserRequest";
import UserVerificationEntity from '../Entities/UserVerificationEntity';

export interface IUserHandler {
    getAll(): Promise<UserResponseList>;
    createUser(newUser:UserRequest) : Promise<UserEntity>;
    verifyUser(info:UserVerificationEntity) : Promise<UserEntity>;
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
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            responseType: UserEntity,
            data:newUser
        });
        return user;
    }

    async verifyUser(info:UserVerificationEntity) : Promise<UserEntity> {
        try {
            console.log("API")
            return await APIHandler(`api/User/Verify`, {
                headers: {"Content-Type" : "application/json"},
                method: "POST",
                responseType: UserEntity,
                data:info
            });
        }catch (e){
            return new UserEntity({Id:-1});
        }
    }
}