import BoxToCompleteList from "./BoxToCompleteList";

class RequestToCompleteEntity {
  id: number;
  signerId: number;
  requestorId: number;
  status: string;
  sentDate: Date;
  dueDate:Date;
  boxes: BoxToCompleteList;

  constructor(data: any) {
    this.id = data.Id;
    this.signerId = data.SignerId;
    this.requestorId = data.RequestorId;
    this.status = data.Status;
    this.sentDate = data.SentDate;
    this.dueDate = data.DueDate;
    this.boxes = new BoxToCompleteList(data.Boxes);
  }
}

export default RequestToCompleteEntity;