import SignatureEntity from "./SignatureEntity";
import UserEntity from "./UserEntity";
import FormEntity from "./FormEntity";

class RequestEntity {
  id: number;
  signer: UserEntity;
  requestor: UserEntity;
  form: FormEntity;
  status: string;
  sentDate: Date;

  constructor(data: any) {
    this.id = data.Id;
    this.signer = data.Signer;
    this.requestor = data.Requestor;
    this.form = data.Form;
    this.status = data.Status;
    this.sentDate = data.SentDate;
  }
}

export default RequestEntity;