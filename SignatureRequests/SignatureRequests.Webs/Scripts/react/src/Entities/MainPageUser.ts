import UserType from "../Util/Enums/UserTypes";

class MainPageUser {
  id: number;
  role?: string;
  name?: string;
  email?: string;
  type: UserType;

  constructor(data: any) {
    this.id = data.id;
    this.role = data.role;
    this.name = data.name;
    this.email = data.email;
    this.type = data.type;
  }
}

export default MainPageUser;