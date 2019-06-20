import SignatureEntity from "./SignatureEntity";

class UserRequest {
  role: string;
  name: string;
  email: string;
  password: string;
  signature?: SignatureEntity;
  initial?: SignatureEntity;

  constructor(data: any) {
    this.role = data.Role;
    this.name = data.Name;
    this.email = data.Email;
    this.password = data.Password;
    this.signature = data.Signature;
    this.initial = data.Initial;
  }
}

export default UserRequest;