import UserEntity from "./UserEntity";
import BoxResponseList from "./BoxResponseList";
import GroupEntity from "./GroupEntity";

class RequestEntity {
  id: number;
  signer: UserEntity;
  group: GroupEntity | null;
  requestor: UserEntity;
  status: string;
  sentDate: Date;
  boxes: BoxResponseList;

  constructor(data: any) {
    this.id = data.Id;
    this.signer = new UserEntity(data.Signer);
    this.group = data.Group ? new GroupEntity(data.Group) : null;
    this.requestor = new UserEntity(data.Requestor);
    this.status = data.Status;
    this.sentDate = data.SentDate;
    this.boxes = new BoxResponseList(data.Boxes);
  }
}

export default RequestEntity;