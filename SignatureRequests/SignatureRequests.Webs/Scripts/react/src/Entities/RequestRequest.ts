import BoxResponseList from './BoxResponseList';
class RequestRequest {
  signerId: number;
  groupId: number;
  requestorId: number;
  status: string;
  sentDate: Date;
  constructor(data: any) {
    this.signerId = data.SignerId;
    this.groupId = data.GroupId;
    this.requestorId = data.RequestorId;
    this.status = data.Status;
    this.sentDate = data.SentDate;
  }
}

export default RequestRequest;