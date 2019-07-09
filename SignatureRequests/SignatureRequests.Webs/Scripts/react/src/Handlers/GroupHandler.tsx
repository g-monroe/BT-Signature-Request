import { APIHandler } from "./apiHandler";
import GroupRequest from "../Entities/GroupRequest";
import GroupEntity from "../Entities/GroupEntity";

export interface IGroupHandler {
    createGroup(entity: GroupRequest) : Promise<GroupEntity>;
}

export class GroupHandler implements IGroupHandler {
    async createGroup(entity: GroupRequest) : Promise<GroupEntity> {
        return await APIHandler(`/api/Group/AddGroup`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: GroupEntity
        });
    }

}
