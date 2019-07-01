import SignatureEntity from "./SignatureEntity";

class UserVerificationEntity {
  name: string;
  password: string;

  constructor(data: any) {
    this.name = data.Name;
    this.password = data.Password;
  }
}

export default UserVerificationEntity;