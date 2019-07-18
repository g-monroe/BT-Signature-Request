

class SimpleUser {
  id: number;
  role: string;
  name: string;
  email: string;
  sigId?: number;
  initId?: number;

  constructor(data: any) {
    this.id = data.Id;
    this.role = data.Role;
    this.name = data.Name;
    this.email = data.Email;
    this.sigId = data.SignatureId;
    this.initId = data.InitialId;
  }
}

export default SimpleUser;