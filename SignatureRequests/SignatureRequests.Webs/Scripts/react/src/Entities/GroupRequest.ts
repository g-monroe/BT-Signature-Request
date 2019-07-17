import { RequestStatusSigning } from "../Util/Enums/RequestStatus";


class GroupRequest {
    formId: number;
    title:string;
    description:string;
    creationDate:Date;
    dueDate:Date;
    status: RequestStatusSigning;
  
    constructor(data: any) {
      this.formId = data.FormId;
      this.title = data.Title;
      this.description = data.Description;
      this.creationDate = data.CreateDate;
      this.dueDate = data.DueDate;
      this.status = data.Status;
    }
  }
  
  export default GroupRequest;