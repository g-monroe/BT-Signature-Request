
class RequestRequest {
  signerId: number;
  requestorId: number;
  formId: number;
  status: string;
  sentDate: Date;

  constructor(data: any) {
    this.signerId = data.SignerId;
    this.requestorId = data.RequestorId;
    this.formId = data.FormId;
    this.status = data.Status;
    this.sentDate = data.SentDate;
  }
}

export default RequestRequest;