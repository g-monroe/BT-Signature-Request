import UserEntity from "./UserEntity";
import BoxResponseList from "./BoxResponseList";
import GroupEntity from "./GroupEntity";

class RequestEntity {
  id: number;
  signer: UserEntity;
  group: GroupEntity;
  requestor: UserEntity;
  status: string;
  sentDate: Date;
  boxes: BoxResponseList;

  constructor(data: any) {
    this.id = data.Id;
    this.signer = data.Signer;
    this.group = data.Group;
    this.requestor = data.Requestor;
    this.status = data.Status;
    this.sentDate = data.SentDate;
    this.boxes = new BoxResponseList(data.Boxes);
  }
}

export default RequestEntity;