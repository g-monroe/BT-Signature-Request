import UserEntity from "./UserEntity";
import FormEntity from "./FormEntity";
import BoxResponseList from "./BoxResponseList";

class RequestEntity {
  id: number;
  signer: UserEntity;
  requestor: UserEntity;
  form: FormEntity;
  status: string;
  sentDate: Date;
  boxes: BoxResponseList;

  constructor(data: any) {
    this.id = data.Id;
    this.signer = data.Signer;
    this.requestor = data.Requestor;
    this.form = data.Form;
    this.status = data.Status;
    this.sentDate = data.SentDate;
    this.boxes = new BoxResponseList(data.Boxes);
  }
}

export default RequestEntity;