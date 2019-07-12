
import BoxResponseList from "../BoxResponseList";

class RequestToCompleteEntity {
  id: number;
  signerId: number;
  requestorId: number;
  status: string;
  sentDate: Date;
  dueDate:Date;
  boxes: BoxResponseList;
  title:string;
  description:string;

  constructor(data: any) {
    this.id = data.Id;
    this.signerId = data.SignerId;
    this.requestorId = data.RequestorId;
    this.status = data.Status;
    this.sentDate = data.SentDate;
    this.dueDate = data.DueDate;
    this.boxes = new BoxResponseList(data.Boxes);
    this.title = data.GroupTitle;
    this.description = data.GroupDescription;
  }
}

export default RequestToCompleteEntity;