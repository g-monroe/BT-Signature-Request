import { APIHandler } from "./apiHandler";
import UserResponseList from "../Entities/UserResponseList";
import UserEntity from "../Entities/UserEntity";
import UserRequest from "../Entities/UserRequest";
import UserVerificationEntity from '../Entities/UserVerificationEntity';
import SimpleUser from '../Entities/ToComplete/SimpleUser';
import NumberResponse from '../Entities/ToComplete/NumberResponse';

export interface IUserHandler {
    getAll(): Promise<UserResponseList>;
    createUser(newUser:UserRequest) : Promise<UserEntity>;
    verifyUser(info:UserVerificationEntity) : Promise<UserEntity>;
    getUser(id:number) : Promise<SimpleUser>;
    getUsersSigId(userId:number) : Promise<NumberResponse>;
    getUsersInitialId(userId:number) : Promise<NumberResponse>;
    getUserById(id:number) : Promise<UserEntity>;
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

    async getUser(id:number) : Promise<SimpleUser>{
        try {
            return await APIHandler(`api/User/GetUser/${id}`, {
                headers: {"Content-Type" : "application/json"},
                method: "GET",
                responseType: SimpleUser,
            });
        }catch (e){
            return new SimpleUser({Id:-1});
        }
    }

    async getUsersSigId(userId:number) : Promise<NumberResponse>{
        try{
            return await APIHandler(`api/User/GetSigId/${userId}`,{
                headers: {"Content-Type" : "application/json"},
                method:'GET',
                responseType: NumberResponse,
            });
        }catch(e){
            return new NumberResponse({Num:-1});
        }
    }

    async getUsersInitialId(userId:number) : Promise<NumberResponse>{
        try{
            return await APIHandler(`api/User/GetInitialId/${userId}`,{
                headers: {"Content-Type" : "application/json"},
                method:'GET',
                responseType: NumberResponse,
            });
        }catch(e){
            return new NumberResponse({Num:-1});
        }
    }
    
    async getUserById(id:number) : Promise<UserEntity>{
            return await APIHandler(`api/User/GetUserById/${id}`, {
                headers: {"Content-Type" : "application/json"},
                method: "GET",
                responseType: UserEntity,
            });
    }
}