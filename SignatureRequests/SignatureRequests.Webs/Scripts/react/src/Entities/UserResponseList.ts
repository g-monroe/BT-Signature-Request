import UserEntity from "./UserEntity";
import FormEntity from "./FormEntity";

class UserResponseList {
  count: number;
  collection: UserEntity[];

  constructor(data: any) {
    this.count = data.TotalResults;
    this.collection = data.UsersList.map((d:UserEntity)  => new UserEntity(d));
  }
}

export default UserResponseList;